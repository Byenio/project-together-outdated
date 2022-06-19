import React from 'react';

export interface ILoginProps {};

export const Login: React.FunctionComponent<ILoginProps> = (props) => {

    return (
        
        <div className="Login">
            <form action="../../scripts/php/login.php" method="post">

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="example@example.com"/>

            </form>
        </div>

    );

};