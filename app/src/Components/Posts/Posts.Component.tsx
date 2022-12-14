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
            <div className="w-full flex flex-wrap">
                {posts.map(item => {
                    return (

                    <div key={item._id} className="p-3 flex flex-wrap text-black border-2 m-[1vw] w-1/5 rounded-xl min-w-[250px] grow min-h-[200px] max-w-[450px]">
                        <div className='basis-1/2 text-left text-xl font-semibold'>{item.subject.name}</div>
                        <div className='basis-1/2 text-right'>{item.user.name} {item.user.class.name}</div>
                        <div className='text-left basis-[100%] grow'>{item.type.name}</div>
                        <div className='flex flex-wrap h-[30%] break-normal basis-[100%]'><p className='w-full text-center'>{item.description}</p></div>
                        <Link to={`/post/${item._id}`}>Go to post</Link>
                    </div>
                    )
                })}
            </div>

        </>

    );

}