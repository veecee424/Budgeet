import { Router } from "express";
const Budget: Router = Router();
import createBudget from "../../services/budget/CreateBudget";
import fetchBudgets from "../../services/budget/FetchBudgets";
import fetchBudget from "../../services/budget/FetchBudget";
import deleteBudget from "../../services/budget/DeleteBudget";
import isAuthenticated from '../../middlewares/IsAuthenticated';

Budget.post("/create/budget", isAuthenticated, createBudget);
Budget.get("/budgets", isAuthenticated, fetchBudgets);
Budget.get("/budget/:id", isAuthenticated, fetchBudget);
Budget.post("/budget/:id", isAuthenticated, deleteBudget);

export default Budget;