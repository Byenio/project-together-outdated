// Imports
import express from 'express';          // Create app
import config from 'config';            // Config for app, /server/config/default.ts
import connect from './Utils/Connect';  // Connect to database
import logger from './Utils/Logger';    // Console logger
import routes from './Routes';          // Routes

const port = config.get<number>('port');

const App = express();

App.use(express.json());

App.listen(port, async () => {

    logger.info(`App is running at http://localhost:${port}`);

    await connect();

    routes(App);

});