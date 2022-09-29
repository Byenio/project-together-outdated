import React, { useEffect, useState } from 'react';
import { Form, IFields } from 'Components/Form/Form.Component';
import { Field } from 'Components/Form/Field/Form.Field.Component';
import { BASE_API_URL } from 'config';
import { getClasses } from 'Proxies/Register/getClasses';

const useClasses = () => {

    const [classes, setClasses] = useState<[]>([])
    const [errors, setErrors] = useState(null);

    const fetchClasses = async () => {

        await getClasses()
            .then((returnedClasses) => {
                setClasses(returnedClasses);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchClasses();
    }, [])

    return { classes, errors };

}

const useFields = (classes: []) => {

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
        },
        class: {
            id: 'class',
            label: 'Class',
            editor: 'dropdown',
            options: classes
        }

    }

    return { fields };

}

export default function Log() {

    const { classes } = useClasses();
    const { fields } = useFields(classes);

    return (

        <Form
            service={{
                success: 'User was successfully registered',
                error: 'User with this email already exists',
                invalid: 'Invalid form'
            }}
            action={`${BASE_API_URL}/api/users`}
            method="POST"
            fields={fields}
            render={() => (

                <React.Fragment>
                    <Field {...fields.name} />
                    <Field {...fields.email} />
                    <Field {...fields.password} />
                    <Field {...fields.passwordConfirmation} />
                    <Field {...fields.class} />
                </React.Fragment>

            )}
        />

    );

}