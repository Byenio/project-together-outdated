import React, { useEffect, useState } from 'react';
import './SetTutors.css';

export interface ISetTutorsProps {};

export const SetTutors: React.FunctionComponent<ISetTutorsProps> = (props) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [ usersListItems, setUsersListItems ] = useState<any[]>([]);

    const fetchItems = async () => {

        const usersList = await fetch(`http://localhost/project-together/api.php/users/list`);

        const usersListItems = await usersList.json();
        setUsersListItems(usersListItems.items);

    }

    return (

        <div className="SetTutors">
            
            <div className="Section-title">
                <h3>Dodaj pomagajacych</h3>
            </div>

            <form className='Form' action="../../../project-together/src/scripts/php/set-flag.php" method='POST'>
                <table className="Table">
                    <tr className="Table-title">
                        <td className="Table-title-id">ID</td>
                        <td className="Table-title-class">Klasa</td>
                        <td className="Table-title-name">Imię i nazwisko</td>
                        <td className="Table-title-email">E-mail</td>
                        <td className="Table-title-flag">Pomagający</td>
                    </tr>

                    { usersListItems.map(
                        item => (

                            <tr className="Table-content">
                                <td className="Table-content-id">{ item.id }</td>
                                <td className="Table-content-class">{ item.class }</td>
                                <td className="Table-content-name">{ item.fName } { item.lName }</td>
                                <td className="Table-content-email">{ item.email }</td>
                                <input type="hidden" name={ `flag${item.id}` } value={ `0_${item.id}` } />
                                <td className="Table-content-flag">
                                    <input 
                                        type="checkbox"
                                        name={ `flag${item.id}` }
                                        value={ `1_${item.id}` }
                                        defaultChecked={ !!item.isTutor }
                                    />
                                </td>
                            </tr>

                        )
                    ) }

                </table>
                <input className='Form-submit' type="submit" value="Zapisz" />
            </form>
        
        </div>

    );

}