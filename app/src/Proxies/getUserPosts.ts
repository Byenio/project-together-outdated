import { BASE_API_URL } from "../config";

export const getUserPosts = async (auth: {
    accessToken?: string | null | undefined,
    refreshToken?: string | null | undefined
}) => {

    var myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${ auth.accessToken }`);
    myHeaders.append("x-refresh", `Bearer ${ auth.refreshToken }`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch(
        `${BASE_API_URL}/api/posts/user`,
        requestOptions
    );

    const userPosts = await response.json();
    
    return userPosts;

}