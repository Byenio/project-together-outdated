import React from "react";

import { Form, IFields } from '../Form/Form.Component';
import { Field } from '../Form/Field/Form.Field.Component';

export interface LogInterface {};

const Log: React.FunctionComponent = () => {

    const fields: IFields = {

        name: {
            id: 'name',
            label: 'Full Name'
        },
        email: {
            id: 'email',
            label: 'Email',
            editor: 'email'
        },
        password: {
            id: 'password',
            label: 'Password',
            editor: 'password'
        },
        passwordConfirmation: {
            id: 'passwordConfirmation',
            label: 'Confirm Password',
            editor: 'password'
        }

    }

    return (

        <Form
            action="http://localhost:1337/api/create-user"
            fields={ fields }
            render={() => (

                <React.Fragment>
                    <Field { ...fields.name } />
                    <Field { ...fields.email } />
                    <Field { ...fields.password } />
                    <Field { ...fields.passwordConfirmation } />
                </React.Fragment>

            )}
        />

    );

}

export default Log;