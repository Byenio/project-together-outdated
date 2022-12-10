import { useEffect, useState } from 'react';
import { getUsers } from 'Proxies/Account.Manage.Tutors/getUsers';
import { useContext } from 'react';
import { AuthContext, AuthContextInterface } from 'Contexts/Auth.Context';
import { UserPermissionForm } from './Components/Form/Account.Manage.Users.Form';
import { useForm } from 'react-hook-form';
import { BASE_API_URL } from 'config';

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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [fetchErrorStatus, setFetchErrorStatus] = useState<Number>(0);

    const onSubmit = async (data: any) => {

        const formData: { _id: string; newPermissionId: unknown; }[] = []
        Object.entries(data).forEach(element => {
            if (element[1] !== '-') {
                const singleUser = {
                    _id: element[0],
                    newPermissionId: element[1]
                }
                formData.push(singleUser);
            }
        })

        if (formData.length > 0) {
            setLoading(true);
            setFetchError(false);
            setFetchErrorStatus(0);

            const resData = [];


            Object.entries(formData).forEach(async element => {
                const user = element[1]
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Accept", "application/json");
                myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
                myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

                const response = await fetch(`${BASE_API_URL}/api/user-update/${user._id}`, {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify({
                        _id: user._id,
                        permissionLevel: user.newPermissionId
                    })
                })
                    .then(res => {
                        if (res.status >= 400) {
                            setFetchError(true);
                            setFetchErrorStatus(res.status);
                            setLoading(false);
                        }
                        return res.json();
                    })

                resData.push(await response);
            })

            setLoading(false);
        }
        window.location.reload();

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    {users.map(user => {
                        return (
                            <>
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.class.name}</td>
                                    <td>{user.permissionLevel.name}</td>
                                    <td>
                                        <select {...register(`${user._id}`)}>
                                            <option disabled selected>-</option>
                                            {permissions.map(permission => {
                                                const available = user.permissionLevel._id !== permission._id
                                                return (
                                                    <>
                                                        {available &&
                                                            <option value={permission._id}>
                                                                {permission.name}
                                                            </option>
                                                        }
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </td>

                                </tr>
                            </>
                        );

                    })}
                </table>
                <input type="submit" value="Potwierdź zmiany" />
            </form>
            {loading &&
                <div>
                    Ładowanie...
                </div>
            }
            {fetchError &&
                <div>
                    Wprowadzono niepoprawne dane
                </div>
            }
        </>
    )

}

export default Users;