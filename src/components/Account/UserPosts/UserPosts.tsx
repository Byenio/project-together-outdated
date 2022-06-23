import React, { useEffect, useState } from 'react';
import './UserPosts.css';

export interface IUserPostsProps {

    user: {
        id: number | null;
        key: string | null;
        password: string | null;
    }

}

export const UserPosts: React.FunctionComponent<IUserPostsProps> = ({ user }: IUserPostsProps) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [userPostsListItems, setUserPostsListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const userPostsList = await fetch(
            `http://localhost/api.php/userposts/list?id=${user.id}&pass=${user.password}&key=${user.key}`
        );

        const userPostsListItems = await userPostsList.json();
        setUserPostsListItems(userPostsListItems.items);

    }

    return (

        <div className="UserPosts">
            { userPostsListItems.map(
                item => (

                    <div id={item.id}>
                        {item.body}
                    </div>
                    
                )) }
        </div>

    );

};