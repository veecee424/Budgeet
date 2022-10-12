import { Router } from "express";
import isAuthenticated from "../../middlewares/IsAuthenticated";
const WalletRoutes: Router = Router();
import fundWallet from "../../services/wallets/FundWallet";
import verifyWalletFunding from "../../services/wallets/VerifyFunding";

WalletRoutes.post("/wallet/fund/initiate", isAuthenticated, fundWallet);
WalletRoutes.post("/wallet/fund/verify", isAuthenticated, verifyWalletFunding);

export default WalletRoutes;