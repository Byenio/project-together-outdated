import React from "react";
import { Link } from 'react-router-dom';
import { Form, IFields } from 'Components/Form/Form.Component';
import { Field } from 'Components/Form/Field/Form.Field.Component';
import { BASE_API_URL } from "config";

export interface LogInterface { };

const useFields = () => {

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

    return { fields };

}

const Log: React.FunctionComponent = () => {

    const { fields } = useFields();

    return (

        <>
            <Form
                service={{
                    success: 'Login successful',
                    error: 'Invalid email or password',
                    invalid: 'Invalid email or password'
                }}
                action={`${BASE_API_URL}/api/sessions`}
                method="POST"
                fields={fields}
                render={() => (

                    <React.Fragment>
                        <Field {...fields.email} />
                        <Field {...fields.password} />
                    </React.Fragment>

                )}
            />
            <Link to='/register'>Nie masz konta? Zarejestruj sie</Link>
        </>

    );

}

export default Log;