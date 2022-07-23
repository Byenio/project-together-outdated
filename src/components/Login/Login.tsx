import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export interface ILoginProps {};

export const Login: React.FunctionComponent<ILoginProps> = (props) => {

    return (
        
        <div className="Login">

            <form action="http://localhost:3000/together/src/scripts/php/login.php" method="post">

                <div className="form-group">
                    <label htmlFor="email">Email</label><br />
                    <input type="email" name="email" id="email" placeholder="example@example.com" required />
                </div>
                    
                <div className="form-group">
                    <label htmlFor="password">Hasło</label><br />
                    <input type="password" name="password" id="password" placeholder="********" required />
                </div>

                <input type="submit" value="Zaloguj" />

            </form>

            <ul className="Register-list">
                <li className="Register-list-item">Nie masz konta?</li>
                <Link to="/register">
                    <li className="Register-list-item">Zarejestruj się</li>
                </Link>
            </ul>

        </div>

    );

};