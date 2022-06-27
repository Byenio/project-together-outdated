import React, { useEffect, useState } from 'react';
import './AddPost.css';

export interface IAddPostProps {};

export const AddPost: React.FunctionComponent<IAddPostProps> = (props) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [subjectListItems, setSubjectListItems] = useState<any[]>([]);
    const [typeListItems, setTypeListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const subjectList = await fetch(
            'http://localhost/api.php/subjects/list'
        );

        const subjectListItems = await subjectList.json();
        setSubjectListItems(subjectListItems.items);

        const typeList = await fetch(
            'http://localhost/api.php/types/list'
        );

        const typeListItems = await typeList.json();
        setTypeListItems(typeListItems.items);

    }

    return (

        <div className="AddPost-container">
            <div className="Section-title">

                <h3>Utwórz post</h3>

                <form action="http://localhost:3000/src/scripts/php/add-post.php" method="post">

                    <div className="form-group">
                        <label htmlFor="body">Treść</label><br />
                        <textarea name="body" id="body" maxLength={255} placeholder="Zajęcia przygotowujące do matury" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Przedmiot</label><br />
                        <select name="subject" id="subject">
                            { subjectListItems.map(item => ( <option value={item.id}  key={item.id}>{item.name}</option> )) }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Typ</label><br />
                        <select name="type" id="type">
                            { typeListItems.map(item => ( <option value={item.id}  key={item.id}>{item.name}</option> )) }
                        </select>
                    </div>

                    <input type="submit" value="Dodaj" />

                </form>

            </div>
        </div>

    );

}