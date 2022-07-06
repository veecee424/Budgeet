import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/budgeet');
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