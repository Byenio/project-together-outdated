import React, { useEffect, useState } from 'react';
import { getCookie } from '../../../../Scripts/Cookies.Get';
import { Link } from 'react-router-dom';

export interface UserPostsInterface {};

const UserPosts: React.FunctionComponent<UserPostsInterface> = (props) => {

    const user = {
        _id: String(getCookie('userId')),
        accessToken: String(getCookie('accessToken')),
        refreshToken: String(getCookie('refreshToken'))
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const [ postListItems, setPostListItems ] = useState<any[]>([]);

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${user.accessToken}`);
        myHeaders.append("x-refresh", `Bearer ${user.refreshToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const postList = await fetch(
            `http://localhost:1337/api/posts/user`,
            requestOptions
        );

        const newAccessToken = (postList.headers.get('x-access-token'));

        const postListItems = await postList.json();
        setPostListItems(postListItems);

    }

    return (
        
        <>

            {postListItems.map(item => {
                return (
                    <>
                        <div key={item._id}>
                            <div>{item.subject}</div>
                            <div>{item.user.name} {item.user.class.name}</div>
                            <div>{item.description}</div>
                            <Link to={`/post/${item._id}`}>Go to post</Link>
                        </div>
                        <br />
                    </>
                )
            })}

        </>

    );

}

export default UserPosts;