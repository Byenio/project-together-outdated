import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/Auth.Context';
import { getUserPosts } from '../../../Proxies/getUserPosts';

export interface UserPostsInterface {};

const useUserPosts = () => {

    const auth = useContext(AuthContext);

    const [ userPosts, setUserPosts ] = useState<any[]>([]);
    const [ errors, setErrors ] = useState(null);

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
        
        <div className='posts-container'>

            { userPosts.map(item => {
                return (

                    <div key={ item._id }>
                        <div>{ item.subject.name }</div>
                        <div>{ item.type.name }</div>
                        <div>{ item.user.name } { item.user.class.name }</div>
                        <div>{ item.description }</div>
                        <Link to={ `/post/${ item._id }` }>Go to post</Link>
                    </div>
                    
                )
            }) }

        </div>

    );

}

export default UserPosts;