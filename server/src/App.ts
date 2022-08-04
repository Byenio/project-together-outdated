import express from 'express';
import config from 'config';
import cors from 'cors';
import connect from './Utils/Connect';
import logger from './Utils/Logger';
import routes from './Routes';
import deserializeUser from './Middleware/DeserializeUser';

const port = config.get<number>('port');

const App = express();

App.use(cors());
App.use(express.json());
App.use(deserializeUser);

App.listen(port, async () => {

    logger.info(`App is running at http://localhost:${port}`);

    await connect();

    routes(App);

});