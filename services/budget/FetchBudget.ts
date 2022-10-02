import { ReqCustom as Request, budget, User } from '../../custom_types/Custom';
import { Response } from 'express';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import Budget from '../../db/models/Budget';

const fetchBudget = async (req: Request, res: Response) => {
    try {
        const USER: User = req.user;
        const ID = req.params.id;
        
        // Validate budget ID
        if(ID.length !== 24) throw new customError("Invalid budget id.", 400);

        // Fetch budgets with the user id.
        const BUDGET:budget|null = await Budget.findOne({owner: USER._id, _id: ID}, null, {lean:true});
        if (!BUDGET || BUDGET.deletedAt) throw new customError("Budget not found.", 400);

        // Return found budgets
        return successResponse(res, 201, "Found budget", BUDGET);
    } catch (e:any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default fetchBudget;