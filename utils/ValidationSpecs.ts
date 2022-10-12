import Joi from "joi";

const registrationSpec = Joi.object({
    firstName: Joi.string().min(2).max(30).trim().required().messages({
        'string.base': 'firstName should be a string',
        'string.min': 'firstName should be more than 1 character',
        'string.max': 'firstName should not be more than 30 characters',
        'any.required': 'firstName is required'
    }),
    lastName: Joi.string().min(2).max(30).trim().required().messages({
        'string.base': 'lastName should be a string',
        'string.min': 'lastName should be more than 1 character',
        'string.max': 'lastName should not be more than 30 characters',
        'any.required': 'lastName is required'
    }),
    email: Joi.string().email().trim().required().messages({
        'string.base': 'email should be a string',
        'any.required': 'email is required'
    }),
    phoneNumber: Joi.number().required().messages({
        'number.base': 'phoneNumber should be of type number',
        'any.required': 'phoneNumber is required'
    }),
    password: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'password is required'
    }),
    country: Joi.string().trim().required().messages({
        'string.base': 'country should be a string',
        'any.required': 'country is required'
    })
});

const loginSpec = Joi.object({
    email: Joi.string().email().trim().required().messages({
        'string.base': 'email should be a string',
        'any.required': 'email is required'
    }),
    password: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'password is required'
    })
});

const forgottenPasswordResetSpec = Joi.object({
    token: Joi.string().trim().required().messages({
        'string.base': 'token must be a valid string',
        'any.required': 'token is required'
    }), 
    newPassword: Joi.any().required().messages({
        'any.required': 'newPassword is required',
    }),
    confirmPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'confirmPassword is required',
    }),
});

const forgottenPasswordSpec = Joi.object({
    email: Joi.string().email().trim().required().messages({
        'any.required': 'email is required'
    })
});

const changePasswordSpec = Joi.object({
    oldPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'oldPassword is required'
    }), 
    newPassword: Joi.any().required().messages({
        'any.required': 'newPassword is required',
    }),
    confirmPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'confirmPassword is required',
    }),
});

const editprofileSpec =  Joi.object({
    firstName: Joi.string().min(2).max(30).trim().messages({
        'string.base': 'firstName should be a string',
        'string.min': 'firstName should be more than 1 character',
        'string.max': 'firstName should not be more than 30 characters'
    }),
    lastName: Joi.string().min(2).max(30).trim().messages({
        'string.base': 'lastName should be a string',
        'string.min': 'lastName should be more than 1 character',
        'string.max': 'lastName should not be more than 30 characters'
    }),
    email: Joi.string().email().messages({
        'string.base': 'email should be a string'
    }),
    phoneNumber: Joi.number().messages({
        'number.base': 'phoneNumber should be of type number'
    })
});

const budgetSpec = Joi.object({
    name: Joi.string().trim().required().min(2).max(50).messages({
        'string.base': 'name should be a string',
        'string.min': 'name should be more than 2 character',
        'string.max': 'name should not be more than 50 characters',
        'any.required': 'name is required'
    }),
    duration: Joi.date().iso().required().messages({
        'date.base': 'duration should be a valid duration/date',
        'date.format': 'Please provide a valid duration/date in YYYY-MM-DD format.',
        'any.required': 'duration is required'
    }),
    description: Joi.string().min(3).max(200).messages({
        'string.base': 'description should be a string',
        'string.min': 'description should be more than 3 character',
        'string.max': 'description should not be more than 200 characters',
    }),
    owner: Joi.any().required().messages({
        'any.required': 'owner is required'
    }),
    budgetDetails: Joi.array().items({
        name: Joi.string().required().min(2).max(50),
        amount: Joi.number().positive().required()
    }).required().messages({
        'string.base': 'description should be a string',
        'string.min': 'description should be more than 2 character',
        'string.max': 'description should not be more than 50 characters',
        'any.required': 'budgetDetails is required'
    }),
    isChecked: Joi.number().required().valid(1, 0).messages({
        'any.required': 'isChecked is required.',
        'any.only': 'isChecked can only take values 1 or 0.'
    })
});

const walletFundingSpec = Joi.object({
    amount: Joi.number().required().min(1).max(20000000).messages({
        'number.base': 'amount should be a string',
        'number.min': 'amount should not be less than 1',
        'number.max': 'amount should not be more than 20000000',
        'any.required': 'amount is required'
    }),
    currency: Joi.string().required().valid("NGN").messages({
        'any.required': 'currency is required',
        'any.only': 'currency can only be NGN for now.'
    })
})

export {
    registrationSpec,
    loginSpec,
    forgottenPasswordResetSpec,
    forgottenPasswordSpec,
    changePasswordSpec,
    editprofileSpec,
    budgetSpec,
    walletFundingSpec
}