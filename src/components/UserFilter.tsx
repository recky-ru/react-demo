import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/jsonPlaceholderService';
import { User } from '../types';
import styles from './UserFilter.module.css';

const UserFilter: React.FC<{ onUserSelected: (userId: number) => void }> = ({ onUserSelected }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers(signal);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
        return () => {
            abortController.abort();
        };

    }, []);

    if (loading) return <div>Loading users...</div>;


    return (
        <select onChange={e => onUserSelected(Number(e.target.value))} defaultValue="" className={styles.selectList}>
            <option value='0'>All</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
};

export default UserFilter;
