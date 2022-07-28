import { Express, Request, Response } from 'express';
import { createUserHandler } from './Controller/User.Controller';
import validateResource from './Middleware/ValidateResource';
import { createUserSchema } from './Schema/User.Schema';
import { createUserSessionHandler } from './Controller/Session.Controller';
import { createSessionSchema } from './Schema/Session.Schema';

function routes(App: Express) {

    App.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    App.post('/api/users', validateResource(createUserSchema), createUserHandler);
    App.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

};

export default routes;