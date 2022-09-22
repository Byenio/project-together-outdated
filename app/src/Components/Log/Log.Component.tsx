import React from "react";
import { Link } from 'react-router-dom';
import { Form, IFields } from '../Form/Form.Component';
import { Field } from '../Form/Field/Form.Field.Component';

export interface LogInterface {};

const Log: React.FunctionComponent = () => {

    const fields: IFields = {
        email: {
            id: 'email',
            label: 'Email',
            editor: 'email'
        },
        password: {
            id: 'password',
            label: 'Password',
            editor: 'password'
        }

    }

    return (

        <>
            <Form
                service = {{
                    success: 'Login successful',
                    error: 'Invalid email or password',
                    invalid: 'Invalid email or password'
                }}
                action ="http://localhost:1337/api/sessions"
                method = "POST"
                fields = { fields }
                render = {() => (

                    <React.Fragment>
                        <Field { ...fields.email } />
                        <Field { ...fields.password } />
                    </React.Fragment>

                )}
            />
            <Link to='/register'>Nie masz konta? Zarejestruj sie</Link>
        </>

    );

}

export default Log;