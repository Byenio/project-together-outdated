import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPostDetails } from 'Proxies/Posts/getPostDetails';

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
                        <div key={item._id} className="p-3 flex flex-wrap text-black  border-2 m-[1vw] w-1/5 rounded-xl min-w-[250px] min-h-[200px] md:w-[450px]">
                        <h1>{`Post ${item._id}`}</h1>
                        <div className='basis-1/2 text-left text-xl font-semibold'>{item.subject.name}</div>
                        <div className='basis-1/2 text-right'>{item.user.name} {item.user.class.name}</div>
                        <div className='text-left basis-[100%] grow'>{item.type.name}</div>
                        <div className='flex flex-wrap h-[30%] break-normal basis-[100%]'><p className='w-full text-center'>{item.description}</p></div>
                        </div>
                    </>
                )
            })}

        </>

    );

}

export default PostDetails;