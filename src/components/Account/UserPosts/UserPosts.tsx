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
            `http://localhost/api.php/userposts/list?
                                        id=${user.id}&
                                        pass=${user.password}&
                                        key=${user.key}`
        );

        const userPostsListItems = await userPostsList.json();
        setUserPostsListItems(userPostsListItems.items);

        console.log(userPostsListItems.items);

    }

    return (

        <div className="UserPosts">

            <div className="Section-title">
                <h3>Twoje posty</h3>
            </div>

            { userPostsListItems.map(
                item => (

                    <div id={item.id} className="Post">
                        <div className="Post-type">{item.type}</div>
                        <div className="Post-subject">{item.subject}</div>
                        <div className='Post-content'>{item.body}</div>
                    </div>
                    
                ))
            }

        </div>

    );

};