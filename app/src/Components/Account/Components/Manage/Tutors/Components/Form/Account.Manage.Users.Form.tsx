import { useForm } from "react-hook-form";
import { BASE_API_URL } from 'config';
import { FC, useContext } from 'react';
import { AuthContext, AuthContextInterface } from 'Contexts/Auth.Context';

interface IUserPermissionForm {
    userId: string;
    permissions: any[]
}

const useSubmit = async (data: any) => {

    const auth = useContext(AuthContext);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
    myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

    const response = await fetch(`${BASE_API_URL}/api/user-update/${data.userId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data)
    })

    const resData = await response.json();

}

export const UserPermissionForm: FC<IUserPermissionForm> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(useSubmit)}>
            <input hidden value={props.userId} {...register('_id')} />
            <select {...register('permissionLevel')}>
                {props.permissions.map(permission => {
                    return (
                        <option value={permission._id}>
                            {permission.name}
                        </option>
                    )
                })}
            </select>
            <input type="submit" />
        </form>
    )

}