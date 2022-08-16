import React, { useState, useEffect } from 'react';

import { Form, IFields } from '../Form/Form.Component';
import { Field } from '../Form/Field/Form.Field.Component';

export interface LogInterface {};

function Log() {

    const classArray: any[] = [];

    async function getClasses() {
        const classes = await fetch('http://localhost:1337/api/classes/all').then(res => res.json());
        for (let i = 0; i < classes.length; i++) {
            classArray.push(classes[i]);
        }
    }
    getClasses();

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
            action="http://localhost:1337/api/users"
            fields={ fields }
            render={() => (

                <React.Fragment>
                    <Field { ...fields.name } />
                    <Field { ...fields.email } />
                    <Field { ...fields.password } />
                    <Field { ...fields.passwordConfirmation } />
                    <Field { ...fields.class } />
                </React.Fragment>

            )}
        />

    );

}

export default Log;