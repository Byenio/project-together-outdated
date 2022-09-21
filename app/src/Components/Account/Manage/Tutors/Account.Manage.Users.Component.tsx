import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../Contexts/Auth.Context';
import { sortAsc } from '../../../../Scripts/Sort.Script';
import { Form, IFields } from '../../../Form/Form.Component';
import { Field } from '../../../Form/Field/Form.Field.Component';

function Users() {

    const auth = useContext(AuthContext);

    useEffect(() => {
        fetchItems();
    }, []);

    const [ userItems, setUserItems ] = useState<any[]>([]);
    const [ formItems, setFormItems ] = useState({
        permissions: []
    });

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${ auth.accessToken }`);
        myHeaders.append("x-refresh", `Bearer ${ auth.refreshToken }`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const users = await fetch (
            'http://localhost:1337/api/users/all',
            requestOptions
        );
        const userItems = await users.json();
        setUserItems(userItems);

        const permissions = await fetch('http://localhost:1337/api/permissions/all');

        const permissionList = await permissions.json();

        sortAsc(permissionList, 'name');

        setFormItems({
            permissions: permissionList
        })

    }

    const fields: IFields = {

        permissionLevel: {
            id: 'permissionLevel',
            label: 'New permission',
            editor: 'dropdown',
            options: formItems.permissions
        }

    }

    return (

        <>
            { userItems.map(user => {

                return (
                    <div>
                        <div key={ user._id }>
                            <div>{ user.name }</div>
                            <div>{ user.class.name }</div>
                            <div>{ user.permissionLevel.name }</div>
                        </div>
                        <div>
                        <Form
                            service = {{
                                success: 'User successfully updated',
                                error: 'Invalid form',
                                invalid: 'Invalid form'
                            }}
                            action = { `http://localhost:1337/api/user-update/${ user._id }` }
                            method = 'PUT'
                            fields = { fields }
                            render = { () => (

                                <React.Fragment>
                                    <Field { ...fields.permissionLevel } />
                                </React.Fragment>

                            ) }
                        />
                        </div>

                    </div>
                );

            }) }
        </>

    )

}

export default Users;