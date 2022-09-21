import {
    Express,
    Request,
    Response
} from 'express';

import userRoutes from './Routes/User.Routes';
import sessionRoutes from './Routes/Session.Routes';
import postRoutes from './Routes/Post.Routes';
import postTypeRoutes from './Routes/Post.Type.Routes';
import classRoutes from './Routes/Class.Routes';
import subjectRoutes from './Routes/Subject.Routes';

function routes(App: Express) {

    userRoutes(App);
    sessionRoutes(App);
    postRoutes(App);
    postTypeRoutes(App);
    classRoutes(App);
    subjectRoutes(App);

};

export default routes;