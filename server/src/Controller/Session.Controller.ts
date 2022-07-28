import { Request, Response } from 'express';
import { validatePassword } from '../Service/User.Service';
import { createSession } from '../Service/Session.Service';
import { signJwt } from '../Utils/Jwt.Utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {

    // password validation
    const user = await validatePassword(req.body);

    if (!user) return res.status(401).send('Invalid email or password');

    // creating session
    const session = await createSession(user._id);

    // creating access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') }
    );

    // creating refresh token

    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('refreshTokenTtl') }
    );

    return res.send({ accessToken, refreshToken });

}