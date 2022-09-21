import React, { useEffect, useState } from 'react';
import { Form, IFields } from '../../Form/Form.Component';
import { Field } from '../../Form/Field/Form.Field.Component';
import { sortAsc, sortDesc } from '../../../Scripts/Sort.Script';

function NewPost() {

    useEffect(() => {
        fetchItems();
    }, [])

    const [ dropdown, setDropdown ] = useState({
        subjects: [],
        types: []
    })

    const fetchItems = async () => {

        const subjects = await fetch('http://localhost:1337/api/subjects/all');
        const subjectList = await subjects.json();
        sortAsc(subjectList, "name");

        const types = await fetch('http://localhost:1337/api/post-types/all');
        const typeList = await types.json();

        const dropdown = {
            subjects: subjectList,
            types: typeList
        }

        setDropdown(dropdown);

    }

    const fields: IFields = {

        subject: {
            id: 'subject',
            label: 'Subject',
            editor: 'dropdown',
            options: dropdown.subjects
        },
        type: {
            id: 'type',
            label: 'Type',
            editor: 'dropdown',
            options: dropdown.types
        },
        description: {
            id: 'description',
            label: 'Description',
            editor: 'textarea'
        }

    }

    return (
        <>
            <Form
                service = {{
                    success: 'Post was created successfully',
                    error: 'Invalid form',
                    invalid: 'Invalid form'
                }}
                action = "http://localhost:1337/api/posts"
                fields = { fields }
                render = { () => (

                    <React.Fragment>
                        <Field { ...fields.subject } />
                        <Field { ...fields.type } />
                        <Field { ...fields.description } />
                    </React.Fragment>

                ) }
            />
        </>
    );

}

export default NewPost;