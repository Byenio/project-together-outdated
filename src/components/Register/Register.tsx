import React from 'react';
import './Register.css';

export interface IRegisterProps {};

export const Register: React.FunctionComponent<IRegisterProps> = (props) => {

    return (

        <div className="Register">

            <form action="../../scripts/php/register.php" method="post">

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
                    <label htmlFor="password">Hasło</label><br />
                    <input type="password" name="password" id="password" placeholder="********" required />
                </div>

                <input type="submit" value="Zarejestruj" />

            </form>

        </div>

    );

};