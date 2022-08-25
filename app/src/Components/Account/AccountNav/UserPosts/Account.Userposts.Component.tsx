import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/Auth.Context';

export interface UserPostsInterface {};

const UserPosts: React.FunctionComponent<UserPostsInterface> = (props) => {

    const auth = useContext(AuthContext);

    useEffect(() => {
        fetchItems();
    }, []);

    const [ postListItems, setPostListItems ] = useState<any[]>([]);

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${ auth.accessToken }`);
        myHeaders.append("x-refresh", `Bearer ${ auth.refreshToken }`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const postList = await fetch(
            `http://localhost:1337/api/posts/user`,
            requestOptions
        );

        const postListItems = await postList.json();
        setPostListItems(postListItems);

    }

    return (
        
        <div className='posts-container'>

            { postListItems.map(item => {
                return (

                    <div key={ item._id }>
                        <div>{ item.subject }</div>
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