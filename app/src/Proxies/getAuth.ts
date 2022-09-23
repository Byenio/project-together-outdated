import { BASE_API_URL } from "../config";

export const getAuth = async (auth: {
    authenticated?: boolean;
    accessToken: string;
    refreshToken: string;
    userData: {
        email: string,
        permissionLevel: {
            level: number
        }
    };
}) => {

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${ auth.accessToken }`);
    myHeaders.append('x-refresh', `Bearer ${ auth.refreshToken }`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    }

    const response = await fetch(
        `${BASE_API_URL}/api/user-private`,
        requestOptions
    )
    
    const user = await response.json();
    const newAccessToken = (response.headers.get('x-access-token'));

    if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken)
        return ({
            authenticated: true,
            accessToken: newAccessToken,
            refreshToken: auth.refreshToken,
            userData: {
                email: user.email,
                permissionLevel: {
                    level: user.permissionLevel.level
                }
            }
        })
    }

    const update = {
        authenticated: true,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        userData: {
            email: user.email,
            permissionLevel: {
                level: user.permissionLevel.level
            }
        }
    }

    return update;

}