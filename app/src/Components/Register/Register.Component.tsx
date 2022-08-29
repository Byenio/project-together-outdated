import React, { useEffect, useState } from 'react';
import { Form, IFields } from '../Form/Form.Component';
import { Field } from '../Form/Field/Form.Field.Component';
import { sortAsc, sortDesc } from '../../Scripts/Sort.Script';

function Log() {

    useEffect(() => {
        fetchItems();
    }, [])

    const [ classArray, setClassArray ] = useState<[]>([])

    const fetchItems = async () => {

        const classes = await fetch('http://localhost:1337/api/classes/all');
        const classList = await classes.json();
        sortAsc(classList, "name");

        setClassArray(classList);

    }

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
            options: classArray
        }

    }

    return (

        <Form
            service = {{
                success: 'User was successfully registered',
                error: 'User with this email already exists',
                invalid: 'Invalid form'
            }}
            action = "http://localhost:1337/api/users"
            fields = { fields }
            render = { () => (

                <React.Fragment>
                    <Field { ...fields.name } />
                    <Field { ...fields.email } />
                    <Field { ...fields.password } />
                    <Field { ...fields.passwordConfirmation } />
                    <Field { ...fields.class } />
                </React.Fragment>

            ) }
        />

    );

}

export default Log;