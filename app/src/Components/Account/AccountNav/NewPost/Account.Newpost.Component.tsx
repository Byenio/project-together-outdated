import React, { useEffect, useState } from 'react';

import { Form, IFields } from '../../../Form/Form.Component';
import { Field } from '../../../Form/Field/Form.Field.Component';

function NewPost() {

    useEffect(() => {
        fetchItems();
    }, [])

    const [ subjectList, setSubjectList ] = useState<any[]>([]);
    const [ typeList, setTypeList ] = useState<any[]>([]);

    const fetchItems = async () => {

        const subjects = await fetch('http://localhost:1337/api/subjects/all');
        const subjectList = await subjects.json();
        setSubjectList(subjectList);

        const types = await fetch('http://localhost:1337/api/post-types/all');
        const typeList = await types.json();
        setTypeList(typeList);

    }

    const fields: IFields = {

        subject: {
            id: 'subject',
            label: 'Subject',
            editor: 'dropdown',
            options: subjectList
        },
        type: {
            id: 'type',
            label: 'Type',
            editor: 'dropdown',
            options: typeList
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