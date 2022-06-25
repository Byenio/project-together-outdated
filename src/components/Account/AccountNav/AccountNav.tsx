import React from 'react';
import './AccountNav.css';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../scripts/tsx/getCookie';

export interface IAccountNavProps {};

export const AccountNav: React.FunctionComponent<IAccountNavProps> = (props) => {

    if (getCookie('isTeacher')) {

        return (

            <div className="AccounNatNav">

                <div className="AccountNav-container">
                    <ul className="AccountNav-list">
                        <Link to="/account">
                            <li className="AccountNav-item">Twoje posty</li>
                        </Link>
                        <Link to="/account/add-post">
                            <li className="AccountNav-item">Utwórz post</li>
                        </Link>
                        <Link to="/account/set-tutors">
                            <li className="AccountNav-item">Dodaj pomagających z bazy</li>
                        </Link>
                        <Link to="/account/security">
                            <li className="AccountNav-item">Zabezpieczenia</li>
                        </Link>
                    </ul>
                </div>

            </div>

        );

    }

    return (

        <div className="AccounNatNav">

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
                </ul>
            </div>

        </div>

    );

}