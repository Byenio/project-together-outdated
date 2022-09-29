import { BASE_API_URL } from "config";

export const getAllPosts = async () => {

    const response = await fetch(`${BASE_API_URL}/api/posts/all`);
    const allPosts = await response.json();

    return allPosts;

}