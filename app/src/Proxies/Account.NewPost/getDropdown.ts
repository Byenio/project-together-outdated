import { BASE_API_URL } from "config";
import { sortAsc } from 'Scripts/Sort.Script';

export const getNewpostDropdown = async () => {

    const subjectsResponse = await fetch(`${BASE_API_URL}/api/subjects/all`);
    const subjects = await subjectsResponse.json();
    sortAsc(subjects, "name");

    const typesResponse = await fetch(`${BASE_API_URL}/api/post-types/all`);
    const types = await typesResponse.json();

    return { subjects, types }

}