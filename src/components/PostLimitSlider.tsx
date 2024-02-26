import React from 'react';
import styles from './PostLimitSlider.module.css';

interface PostLimitSliderProps {
  postLimit: number;
  onLimitChange: (newLimit: number) => void;
  maxLimit: number;
}

const PostLimitSlider: React.FC<PostLimitSliderProps> = ({ postLimit, onLimitChange, maxLimit }) => {
  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="1"
        max={maxLimit}
        value={postLimit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      />
      <span className={styles.sliderLabel}>{postLimit}</span>
    </div>
  );
};

export default PostLimitSlider;