import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/Auth.Context';
import { Form, IFields } from '../../../Form/Form.Component';
import { Field } from '../../../Form/Field/Form.Field.Component';
import { getUsers } from '../../../../Proxies/getUsers';
import { BASE_API_URL } from '../../../../config';

const useUsers = () => {

    const auth = useContext(AuthContext);

    const [users, setUsers] = useState<any[]>([]);
    const [permissions, setPermissions] = useState([]);
    const [errors, setErrors] = useState(null);

    const fetchUsers = async () => {

        getUsers(auth)
            .then((response) => {
                setUsers(response.users);
                setPermissions(response.permissions);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, permissions, errors };

}

const useFields = (permissions: any) => {

    const fields: IFields = {

        permissionLevel: {
            id: 'permissionLevel',
            label: 'New permission',
            editor: 'dropdown',
            options: permissions
        }

    }

    return { fields };

}

function Users() {

    const { users, permissions } = useUsers();
    const { fields } = useFields(permissions);

    return (

        <>
            {users.map(user => {

                return (
                    <div>
                        <div key={user._id}>
                            <div>{user.name}</div>
                            <div>{user.class.name}</div>
                            <div>{user.permissionLevel.name}</div>
                        </div>
                        <div>
                            <Form
                                service={{
                                    success: 'User successfully updated',
                                    error: 'Invalid form',
                                    invalid: 'Invalid form'
                                }}
                                action={`${BASE_API_URL}/api/user-update/${user._id}`}
                                method='PUT'
                                fields={fields}
                                render={() => (

                                    <React.Fragment>
                                        <Field {...fields.permissionLevel} />
                                    </React.Fragment>

                                )}
                            />
                        </div>

                    </div>
                );

            })}
        </>

    )

}

export default Users;