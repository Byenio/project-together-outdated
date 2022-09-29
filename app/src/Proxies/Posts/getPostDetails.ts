import { Params } from "react-router";
import { BASE_API_URL } from "config";

export const getPostDetails = async (params: Readonly<Params<string>>) => {

    const response = await fetch(`${BASE_API_URL}/api/posts/${params._id}`);
    const post = [await response.json()];

    return post;

}