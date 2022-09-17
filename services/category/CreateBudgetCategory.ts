import { ReqCustom as Request, budgetCategory, User } from '../../custom_types/Custom';
import { Response } from 'express';
import { successResponse, errorResponse, customError } from '../../utils/ResponseFormatter';
import BudgetCategory from '../../db/models/BudgetCategory';
import { validateAsync } from '../../utils/Validate';
import { budgetCategorySpec } from '../../utils/ValidationSpecs';
import dayjs from 'dayjs';
dayjs().format();

const createBudgetCategory = async ( req: Request, res: Response ) => {
    
    try {

        const USER: User = req.user;
        req.body.owner = USER._id;

        // validate input
        const PARAMS: budgetCategory = await validateAsync(budgetCategorySpec, req.body);

        // Check if name has been been created
        const NAME_EXISTS = await BudgetCategory.findOne({name: PARAMS.name}, null, {lean: true});
        if (NAME_EXISTS && !NAME_EXISTS.deletedAt) throw new customError("Budget category name already exists.", 400);
        
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

        const NEW_BUDGET_CATEGORY = await BudgetCategory.create(PARAMS);
        if (!NEW_BUDGET_CATEGORY) throw new customError('Unable to create new category', 400);

        return successResponse(res, 200, "Budget category created successfully", NEW_BUDGET_CATEGORY);

    } catch (e:any) {
        return errorResponse(res, e?.code, e?.message);
    }
}

export default createBudgetCategory;