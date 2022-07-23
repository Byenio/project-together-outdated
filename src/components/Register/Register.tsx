import React, { useEffect, useState } from 'react';
import './Register.css';

export interface IRegisterProps {};

export const Register: React.FunctionComponent<IRegisterProps> = (props) => {

    useEffect(() => {

        fetchItems();

    }, []);

    const [classListItems, setClassListItems] = useState<any[]>([]);

    const fetchItems = async () => {

        const classList = await fetch(
            'http://localhost/project-together/api.php/classes/list'
        );

        const classListItems = await classList.json();
        setClassListItems(classListItems.items);

    }

    return (

        <div className="Register">

            <form action="http://localhost/project-together/src/scripts/php/register.php" method="POST">

                <div className="form-group">
                    <label htmlFor="fname">Imię</label><br />
                    <input type="fname" name="fname" id="fname" placeholder="John" required />
                </div>

                <div className="form-group">
                    <label htmlFor="lname">Nazwisko</label><br />
                    <input type="lname" name="lname" id="lname" placeholder="Smith" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label><br />
                    <input type="email" name="email" id="email" placeholder="example@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="class">Klasa</label><br />
                    <select name="class" id="class">
                        { classListItems.map(item => ( <option value={item.id} key={item.id}>{item.name}</option> )) }
                    </select>
                </div>
                    
                <div className="form-group">
                    <label htmlFor="password">Hasło</label><br />
                    <input type="password" name="password" id="password" placeholder="********" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password-repeat">Powtórz hasło</label><br />
                    <input type="password" name="password-repeat" id="password-repeat" placeholder="********" required />
                </div>

                <input type="submit" value="Zarejestruj" />

            </form>

        </div>

    );

};