import React, { useEffect, useState } from 'react';
import { Form, IFields } from '../../Form/Form.Component';
import { Field } from '../../Form/Field/Form.Field.Component';
import { BASE_API_URL } from '../../../config';
import { getNewpostDropdown } from '../../../Proxies/getNewpostDropdown';

const useDropdown = () => {

    const [ dropdown, setDropdown ] = useState({
        subjects: [],
        types: []
    })
    const [ errors, setErrors ] = useState(null);

    const fetchDropdown = async () => {

        getNewpostDropdown()
            .then((response) => {
                setDropdown({
                    subjects: response.subjects,
                    types: response.types
                })
            })
            .catch((error) => {
                setErrors(error)
            })

    }

    useEffect(() => {
        fetchDropdown();
    }, [])

    return { dropdown };

}

const useFields = (dropdown: { subjects: any[], types: any[] }) => {

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

    return { fields };

}

function NewPost() {

    const { dropdown } = useDropdown();
    const { fields } = useFields(dropdown);    

    return (
        <>
            <Form
                service = {{
                    success: 'Post was created successfully',
                    error: 'Invalid form',
                    invalid: 'Invalid form'
                }}
                action = { `${BASE_API_URL}/api/posts` }
                method = 'POST'
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