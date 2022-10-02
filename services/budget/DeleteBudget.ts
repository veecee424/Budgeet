import { ReqCustom as Request, budget, User } from '../../custom_types/Custom';
import { Response } from 'express';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import Budget from '../../db/models/Budget';

const deleteBudget = async (req: Request, res: Response) => {
    try {
        const ID =  req.params.id;
        
        // Validate budget ID
        if(ID.length !== 24) throw new customError("Invalid budget id.", 400);

        // Check if ID is valid for a budget
        const VALID_BUDGET:budget|null = await Budget.findOne({owner: ID});
        if (!VALID_BUDGET || VALID_BUDGET.deletedAt) throw new customError("Budget not found.", 400);

        VALID_BUDGET.deletedAt = Date.now();
        await VALID_BUDGET.save();
        
        return successResponse(res, 200, "Budget deleted successfully", []);

    } catch (e:any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default deleteBudget;