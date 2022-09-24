import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPostDetails } from '../../../Proxies/getPostDetails';

export interface PostDetailsInterface { };

const usePost = () => {

    const [post, setPost] = useState<any[]>([]);
    const [errors, setErrors] = useState(null);
    const params = useParams();

    const fetchPost = async () => {

        await getPostDetails(params)
            .then((returnedPost) => {
                setPost(returnedPost);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchPost();
    }, []);

    return { post, errors };

}

const PostDetails: React.FunctionComponent<PostDetailsInterface> = (props) => {

    const { post } = usePost();

    return (

        <>

            {post.map(item => {
                return (
                    <>
                        <h1>{`Post ${item._id}`}</h1>
                        <div key={item._id}>
                            <div>{item.subject.name}</div>
                            <div>{item.type.name}</div>
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