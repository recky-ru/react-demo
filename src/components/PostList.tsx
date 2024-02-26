import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { fetchPosts } from '../services/jsonPlaceholderService';
import styles from './PostList.module.css';
import UserFilter from './UserFilter';
import PostLimitSlider from './PostLimitSlider';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<number>(0);
    const [postLimit, setPostLimit] = useState<number>(10);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts(signal);
                setPosts(fetchedPosts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();

        return () => {
            abortController.abort();
        };
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className={styles.toolbar}>
                <PostLimitSlider
                    postLimit={postLimit}
                    onLimitChange={setPostLimit}
                    maxLimit={posts?.length ?? 20}
                />
                <UserFilter onUserSelected={(userId) => setSelectedUser(Number(userId))} />
            </div>

            <main className={styles.postList}>
                {posts
                    .filter(post => selectedUser === 0 || post.userId === selectedUser)
                    .map(post => (
                        <div key={post.id} className={styles.postItem}>
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            <p className={styles.postBody}>{post.body}</p>
                        </div>
                    ))
                    .slice(0, postLimit)}
            </main>
        </>
    );
};

export default PostList;
