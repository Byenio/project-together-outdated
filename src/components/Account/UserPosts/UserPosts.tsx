import React, { useEffect, useState } from 'react';
import './UserPosts.css';

export interface IUserPostsProps {}

export const UserPosts: React.FunctionComponent<IUserPostsProps> = (props) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [userPostsListItems, setUserPostsListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const userPostsList = await fetch(
            `http://localhost/api.php/userposts/list?id=1`
        );

        const userPostsListItems = await userPostsList.json();
        setUserPostsListItems(userPostsListItems.items);

        console.log(userPostsListItems.items);

    }

    return (

        <div className="UserPosts">
            { userPostsListItems.map(item => (
                                <div id={item.id}>
                                    {item.body}
                                </div>
                                )) }
        </div>

    );

};