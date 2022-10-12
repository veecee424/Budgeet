import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import './db/DbConfig';
import UserRoutes from './routes/onboarding/UserRoutes';
import BudgetRoutes from './routes/budget/BudgetRoutes';
import WalletRoutes from './routes/wallet/WalletRoutes';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(UserRoutes);
app.use(BudgetRoutes);
app.use(WalletRoutes);

const PORT: number|string = process.env.PORT || 1000;

app.listen(PORT, ()=> console.log(`Server is connected on ${PORT}.`));