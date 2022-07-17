import mongoose from 'mongoose';
import { config as appConfig} from '../config/appConfig';
import { config } from 'dotenv';
config();

const baseUrl = appConfig.useLocalDB && 'localhost' || 'host.docker.internal';
const mongoUrl = process.env.MONGO_URI || `mongodb://${baseUrl}:27017/budgeet`;
mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('DB connected');
});

db.on('disconnected', ()=> {
    console.log('DB connection disconnected');
});

db.on('error', ()=> {
    console.log('Error connecting to DB.');
});

export default db;