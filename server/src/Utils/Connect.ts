import mongoose from 'mongoose';
import config from 'config';
import logger from './Logger';

async function connect() {

    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        logger.info('Connected to database');
    } catch (error) {
        logger.error('Could not connect to database');
        console.log(error);
        process.exit(1);
    }

}

export default connect;