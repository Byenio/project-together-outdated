import React, { useEffect, useState } from 'react';
import './Posts.css';

export interface IPostsProps {}

export const Posts: React.FunctionComponent<IPostsProps> = (props) => {
    
    useEffect(() => {

        fetchItems();

    }, []);

    const [userPostsListItems, setUserPostsListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const userPostsList = await fetch(`http://localhost/together/api.php/posts/list`);

        const userPostsListItems = await userPostsList.json();
        setUserPostsListItems(userPostsListItems.items);

        console.log(userPostsListItems.items);

    }

    return (

        <div className="Posts">

            <div className="Section-title">
                <h3>Wszystkie posty</h3>
            </div>

            { userPostsListItems.map(
                item => (

                    <div id={item.id} className="Post">
                        <div className="Post-type">{item.type}</div>
                        <div className="Post-subject">{item.subject}</div>
                        <div className='Post-content'>{item.body}</div>
                        <div className="Post-author">
                            {item.studentfname} {item.studentlname} {item.teacherfname} {item.teacherlname} {item.class}</div>
                    </div>
                    
                ))
            }

        </div>

    );
    
};