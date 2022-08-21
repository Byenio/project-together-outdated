import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface UserPostsInterface {};

const UserPosts: React.FunctionComponent<UserPostsInterface> = (props) => {

    const tokens = {
        accessToken: String(localStorage.getItem('accessToken')),
        refreshToken: String(localStorage.getItem('refreshToken'))
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const [ postListItems, setPostListItems ] = useState<any[]>([]);

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${ tokens.accessToken }`);
        myHeaders.append("x-refresh", `Bearer ${ tokens.refreshToken }`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const postList = await fetch(
            `http://localhost:1337/api/posts/user`,
            requestOptions
        );

        const newAccessToken = (postList.headers.get('x-access-token'));
        
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
        }

        const postListItems = await postList.json();
        setPostListItems(postListItems);

    }

    return (
        
        <>

            { postListItems.map(item => {
                return (
                    <>
                        <div key={ item._id }>
                            <div>{ item.subject }</div>
                            <div>{ item.user.name } { item.user.class.name }</div>
                            <div>{ item.description }</div>
                            <Link to={ `/post/${ item._id }` }>Go to post</Link>
                        </div>
                        <br />
                    </>
                )
            }) }

        </>

    );

}

export default UserPosts;