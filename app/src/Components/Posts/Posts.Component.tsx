import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllPosts } from "Proxies/Posts/getAllPosts";

export interface PostsInterface { };

const usePosts = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [errors, setErrors] = useState(null);

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
            <div className="w-full flex flex-wrap">
                {posts.map(item => {
                    return (

                        <div key={item._id} className="min-w-[400px] flex flex-wrap">
                            <div className="flex-1">{item.subject.name}</div>
                            <div className="flex-1">{item.type.name}</div>
                            <div className="flex-1">{item.user.name} {item.user.class.name}</div>
                            <div className="flex-1">{item.description}</div>
                            <Link to={`/post/${item._id}`}>Go to post</Link>
                        </div>
                    )
                })}
            </div>

        </>

    );

}