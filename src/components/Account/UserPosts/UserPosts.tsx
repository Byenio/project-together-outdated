import React, { useEffect, useState } from 'react';
import './UserPosts.css';

export interface IUserPostsProps {

    user: {
        id: number | null;
        key: string | null;
        password: string | null;
    }

}

function deletePost(id: number): any {

    window.location.href = `http://localhost/project-together/src/scripts/php/remove-post.php?id=${id}`;
    
}

export const UserPosts: React.FunctionComponent<IUserPostsProps> = ({ user }: IUserPostsProps) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [userPostsListItems, setUserPostsListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const userPostsList = await fetch(
            `http://localhost/project-together/api.php/userposts/list?
            id=${user.id}&
            pass=${user.password}&
            key=${user.key}`
        );

        const userPostsListItems = await userPostsList.json();
        setUserPostsListItems(userPostsListItems.items);

    }

    return (

        <div className="UserPosts">

            <div className="Section-title">
                <h3>Twoje posty</h3>
            </div>

            { userPostsListItems.map(
                item => (

                    <div id={ item.id } className="Post">
                        <div className="Post-type">{ item.type }</div>
                        <div className="Post-subject">{ item.subject }</div>
                        <div className="Post-content">{ item.body }</div>
                        <div className="Post-remove"
                            id={ item.id }
                            onClick={ () => deletePost(item.id) }>Usuń post</div>
                    </div>
                    
                ))
            }

        </div>

    );

};