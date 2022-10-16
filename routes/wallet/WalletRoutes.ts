import { Router } from "express";
import isAuthenticated from "../../middlewares/IsAuthenticated";
const WalletRoutes: Router = Router();
import fundWallet from "../../services/wallets/FundWallet";
import verifyWalletFunding from "../../services/wallets/VerifyFunding";
import fetchBalance from '../../services/wallets/FetchBalance';
import fetchTransactions from '../../services/wallets/FetchAccountTransactions';

WalletRoutes.post("/wallet/fund/initiate", isAuthenticated, fundWallet);
WalletRoutes.post("/wallet/fund/verify", isAuthenticated, verifyWalletFunding);
WalletRoutes.get("/wallet/balance", isAuthenticated, fetchBalance);
WalletRoutes.get("/wallet/account/transactions", isAuthenticated, fetchTransactions);

export default WalletRoutes;