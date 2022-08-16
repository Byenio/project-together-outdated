import React from "react";

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

        <Form
            action="http://localhost:1337/api/sessions"
            fields={ fields }
            render={() => (

                <React.Fragment>
                    <Field { ...fields.email } />
                    <Field { ...fields.password } />
                </React.Fragment>

            )}
        />

    );

}

export default Log;