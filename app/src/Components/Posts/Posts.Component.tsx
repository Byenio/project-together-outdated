import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllPosts } from "../../Proxies/getAllPosts";

export interface PostsInterface {};

const usePosts = () => {

    const [ posts, setPosts ] = useState<any[]>([]);
    const [ errors, setErrors ] = useState(null);

    const fetchPosts = async () => {

        await getAllPosts()
            .then((returnedPosts) => {
                setPosts(returnedPosts);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, errors };

}

export const Posts: React.FunctionComponent<PostsInterface> = (props) => {

    const { posts } = usePosts();

    return (

        <>

            <h1>Posts</h1>
            {posts.map(item => {
                return (

                    <div key={item._id}>
                        <div>{item.subject.name}</div>
                        <div>{ item.type.name }</div>
                        <div>{item.user.name} {item.user.class.name}</div>
                        <div>{item.description}</div>
                        <Link to={`/post/${item._id}`}>Go to post</Link>
                    </div>
                    
                )
            })}

        </>

    );

}