import { getCookie } from './getCookie';

export function checkAuth() {

    if (!getCookie('logged')) { return false; }
    if (getCookie('user["email"]') == null) { return false; }
    if (getCookie('user["password"]') == null) { return false; }
    return true;

}