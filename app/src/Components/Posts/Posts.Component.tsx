import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export interface PostsInterface {};

const Posts: React.FunctionComponent<PostsInterface> = (props) => {

    useEffect(() => {
        fetchItems();
    }, []);

    const [ postListItems, setPostListItems ] = useState<any[]>([]);

    const fetchItems = async () => {

        const postList = await fetch(
            'http://localhost:1337/api/posts/all'
        );

        const postListItems = await postList.json();
        setPostListItems(postListItems);

    }

    return (

        <>

            <h1>Posts</h1>
            {postListItems.map(item => {
                return (

                    <div key={item._id}>
                        <div>{item.subject}</div>
                        <div>{item.user.name} {item.user.class.name}</div>
                        <div>{item.description}</div>
                        <Link to={`/post/${item._id}`}>Go to post</Link>
                    </div>
                    
                )
            })}

        </>

    );

}

export default Posts;