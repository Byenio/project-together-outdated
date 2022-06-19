import React from 'react';
import './Posts.css';

export interface IPostsProps {}

export const Posts: React.FunctionComponent<IPostsProps> = (props) => {
    return (
        <div className="Posts">
            <div className="Posts-post">Post 1</div>
            <div className="Posts-post">Post 2</div>
            <div className="Posts-post">Post 3</div>
        </div>
    );
};