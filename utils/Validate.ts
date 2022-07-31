import Joi from 'joi';
import { customError } from '../utils/ResponseFormatter';
 
const validateAsync = async (schema: Joi.ObjectSchema, payload: Object):Promise<any> => {
    try {
        return await schema.validateAsync(payload);
    } catch (e:any) {
        throw new customError(e.details[0].message, 400);
    }
}

const validateSync = (schema: Joi.ObjectSchema, payload: Object):any => {
    try {
        return schema.validate(payload);
    } catch (e:any) {
        throw new customError(e.details[0].message, 400);
    }
}

export {
    validateAsync,
    validateSync
};