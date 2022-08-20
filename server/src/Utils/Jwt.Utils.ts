import jwt, { Secret } from 'jsonwebtoken';
import config from 'config';


const privateKey = config.get<Secret>('privateKey');
const publicKey = config.get<Secret>('publicKey');

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
) {

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });

}

export function verifyJwt(token: string){

    try {

        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded
        }

    } catch(e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }

    }

}