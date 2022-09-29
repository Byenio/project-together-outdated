import { BASE_API_URL } from "config";
import { sortAsc } from 'Scripts/Sort.Script';

export const getUsers = async (auth: {
    accessToken?: string | null | undefined,
    refreshToken?: string | null | undefined
}) => {

    var myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${auth.accessToken}`);
    myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const usersResponse = await fetch(
        `${BASE_API_URL}/api/users/all`,
        requestOptions
    );
    const users = await usersResponse.json();

    const permissionsResponse = await fetch(`${BASE_API_URL}/api/permissions/all`);
    const permissions = await permissionsResponse.json();

    sortAsc(permissions, 'name');

    return { users, permissions }

}