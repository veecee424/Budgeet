import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import './db/DbConfig';
import UserRoutes from './routes/onboarding/UserRoutes';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(UserRoutes);

const PORT: number|string = process.env.PORT || 1000;

app.listen(PORT, ()=> console.log(`Server is connected on ${PORT}.`));