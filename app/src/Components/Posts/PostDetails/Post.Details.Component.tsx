import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export interface PostDetailsInterface {};

const PostDetails: React.FunctionComponent<PostDetailsInterface> = (props) => {

    useEffect(() => {
        fetchItems();
    }, []);

    const [ post, setPost ] = useState<any[]>([]);
    const params = useParams();

    const fetchItems = async () => {

        const postList = await fetch(
            `http://localhost:1337/api/posts/${params._id}`
        );

        const post = [await postList.json()];
        setPost(post);

        console.log(post)

    }

    return (

        <>

            {post.map(item => {
                return (
                    <>
                        <h1>{ `Post ${item._id}` }</h1>
                        <div key={item._id}>
                            <div>{item.subject}</div>
                            <div>{item.user.name} {item.user.class.name}</div>
                            <div>{item.description}</div>
                        </div>
                    </>
                )
            })}

        </>

    );

}

export default PostDetails;