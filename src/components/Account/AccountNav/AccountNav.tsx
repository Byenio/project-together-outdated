import React from 'react';
import './AccountNav.css';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../scripts/tsx/getCookie';

export interface IAccountNavProps {};

function logout(): any {

    window.location.href = 'http://localhost/project-together/src/scripts/php/logout.php';

}

export const AccountNav: React.FunctionComponent<IAccountNavProps> = (props) => {

    if (getCookie('isTeacher')) {

        return (

            <div className="AccountNav">

                <div className="AccountNav-container">
                    <ul className="AccountNav-list">
                        <Link to="/account">
                            <li className="AccountNav-item">Twoje posty</li>
                        </Link>
                        <Link to="/account/add-post">
                            <li className="AccountNav-item">Utwórz post</li>
                        </Link>
                        <Link to="/account/set-tutors">
                            <li className="AccountNav-item">Dodaj pomagających</li>
                        </Link>
                        <Link to="/account/security">
                            <li className="AccountNav-item">Zabezpieczenia</li>
                        </Link>
                        <li className="AccountNav-item" onClick={ () => logout() }>Wyloguj</li>
                    </ul>
                </div>

            </div>

        );

    }

    return (

        <div className="AccountNav">

            <div className="AccountNav-container">
                <ul className="AccountNav-list">
                    <Link to="/account">
                        <li className="AccountNav-item">Twoje posty</li>
                    </Link>
                    <Link to="/account/add-post">
                        <li className="AccountNav-item">Utwórz post</li>
                    </Link>
                    <Link to="/account/security">
                        <li className="AccountNav-item">Zabezpieczenia</li>
                    </Link>
                    <li className="AccountNav-item" onClick={ () => logout() }>Wyloguj</li>
                </ul>
            </div>

        </div>

    );

}