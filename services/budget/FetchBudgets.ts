import { ReqCustom as Request, budget, User } from '../../custom_types/Custom';
import { Response } from 'express';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import Budget from '../../db/models/Budget';

const fetchBudgets = async (req: Request, res: Response) => {
    try {
        const USER: User = req.user;
        // Fetch budgets with the user id.
        const BUDGETS:budget[] = await Budget.find({owner: USER._id, deletedAt: null}, null, {lean:true});
        if (Array.isArray(BUDGETS) && !BUDGETS.length) throw new customError("You don't have any budget at the moment.", 400);

        // Return found budgets
        return successResponse(res, 201, `Found ${BUDGETS.length} budget(s)`, BUDGETS);
    } catch (e:any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default fetchBudgets;