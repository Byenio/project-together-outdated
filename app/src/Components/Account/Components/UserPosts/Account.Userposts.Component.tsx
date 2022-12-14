import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'Contexts/Auth.Context';
import { getUserPosts } from 'Proxies/Account.UserPosts/getUserPosts';

export interface UserPostsInterface { };

const useUserPosts = () => {

    const auth = useContext(AuthContext);

    const [userPosts, setUserPosts] = useState<any[]>([]);
    const [errors, setErrors] = useState(null);

    const fetchItems = async () => {

        getUserPosts(auth)
            .then((response) => {
                setUserPosts(response);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchItems();
    }, []);

    return { userPosts, errors };

}

const UserPosts: React.FunctionComponent<UserPostsInterface> = (props) => {

    const { userPosts } = useUserPosts();

    return (

        <div className='posts-container flex-1 flex flex-wrap'>

            {userPosts.map(item => {
                return (

                    <div key={item._id} className="p-3 flex flex-wrap text-black border-2 m-[1vw] w-1/4 rounded-xl min-w-[250px] grow min-h-[200px] max-w-[500px]">
                        <div className='basis-1/2 text-left text-xl font-semibold'>{item.subject.name}</div>
                        <div className='basis-1/2 text-right'>{item.user.name} {item.user.class.name}</div>
                        <div className='text-left basis-[100%] grow'>{item.type.name}</div>
                        <div className='flex flex-wrap h-[30%] break-normal basis-[100%]'><p className='w-full text-center'>{item.description}</p></div>
                        <Link to={`/post/${item._id}`}>Go to post</Link>
                    </div>

                )
            })}

        </div>

    );

}

export default UserPosts;