import { Router } from "express";
const BudgetCategoryRoute: Router = Router();
import createBudgetCategory from "../../services/category/CreateBudgetCategory";
import isAuthenticated from '../../middlewares/IsAuthenticated';

BudgetCategoryRoute.post("/create/budget-category", isAuthenticated ,createBudgetCategory);

export default BudgetCategoryRoute;