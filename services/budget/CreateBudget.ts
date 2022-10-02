import { ReqCustom as Request, budget, User } from '../../custom_types/Custom';
import { Response } from 'express';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import Budget from '../../db/models/Budget';
import { validateAsync } from '../../utils/Validate';
import { budgetSpec } from '../../utils/ValidationSpecs';
import dayjs from 'dayjs';
dayjs().format();

const createBudget = async ( req: Request, res: Response ) => {
    
    try {

        const USER: User = req.user;
        req.body.owner = USER._id;

        // validate input
        const PARAMS: budget = await validateAsync(budgetSpec, req.body);

        // Check if name has been been created
        const NAME_EXISTS = await Budget.findOne({name: PARAMS.name}, null, {lean: true});
        if (NAME_EXISTS && !NAME_EXISTS.deletedAt) throw new customError("Budget name already exists.", 400);
        
        // Validate date input
        const IS_VALID_DATE = dayjs(PARAMS.duration, 'YYYY-MM-DD', true).isValid();
        if (!IS_VALID_DATE) throw new customError("Please provide a valid duration in YYYY-MM-DD format.");

        // Parse date and ensure it's not in the past
        const IS_FUTURE_DATE = dayjs(PARAMS.duration).isAfter(Date.now());
        if (!IS_FUTURE_DATE) throw new customError("Please provide a valid future budget duration.");

        // Validate each budget detail
        let nameObj: {name?: string} = {};
        PARAMS.budgetDetails.forEach(detail => {
            if (nameObj.name == detail.name) throw new customError(`You can only create a single budget for ${detail.name}.`); 
            nameObj.name = detail.name;
        });

        if (Number(PARAMS.isChecked) !== 1) throw new customError("Please confirm your budget details.", 403);
        delete PARAMS.isChecked;

        const NEW_BUDGET_CATEGORY = await Budget.create(PARAMS);
        if (!NEW_BUDGET_CATEGORY) throw new customError('Unable to create new budget', 400);

        return successResponse(res, 200, "Budget created successfully", NEW_BUDGET_CATEGORY);

    } catch (e:any) {
        if (e.code === 11000) {
            return res.status(500).json({
                status: "error",
                message:  'Budget name already exists.',
                data: null
            });
        }
        return errorResponse(res, e?.code, e?.message);
    }
}

export default createBudget;