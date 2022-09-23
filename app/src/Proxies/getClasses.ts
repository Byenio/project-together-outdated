import { BASE_API_URL } from '../config';
import { sortAsc, sortDesc } from '../Scripts/Sort.Script';

export const getClasses = async () => {

    const response = await fetch(`${BASE_API_URL}/api/classes/all`);
    const classes = await response.json();
    
    sortAsc(classes, 'name');

    return classes;

}