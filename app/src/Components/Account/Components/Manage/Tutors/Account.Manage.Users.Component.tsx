import { useEffect, useState } from 'react';
import { getUsers } from 'Proxies/Account.Manage.Tutors/getUsers';
import { useContext } from 'react';
import { AuthContext, AuthContextInterface } from 'Contexts/Auth.Context';
import { UserPermissionForm } from './Components/Form/Account.Manage.Users.Form';

const useUsers = (auth: Partial<AuthContextInterface>) => {

    const [users, setUsers] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
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

function Users() {

    const auth = useContext(AuthContext);
    const { users, permissions } = useUsers(auth);

    return (

        <>
            {users.map(user => {
                return (
                    <>
                        <div key={user._id}>
                            <div>{user.name}</div>
                            <div>{user.class.name}</div>
                            <div>{user.permissionLevel.name}</div>
                            <UserPermissionForm
                                userId={user._id}
                                permissions={permissions}
                            />
                        </div>

                    </>
                );

            })}
        </>

    )

}

export default Users;