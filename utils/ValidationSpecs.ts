import Joi from "joi";

const registrationSpec = Joi.object({
    firstName: Joi.string().min(2).max(30).trim().required().messages({
        'string.base': 'First name should be a string',
        'string.min': 'First name should be more than 1 character',
        'string.max': 'First name should not be more than 30 characters',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().min(2).max(30).trim().required().messages({
        'string.base': 'Last name should be a string',
        'string.min': 'Last name should be more than 1 character',
        'string.max': 'Last name should not be more than 30 characters',
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'email should be a string',
        'any.required': 'email is required'
    }),
    phoneNumber: Joi.number().required().messages({
        'number.base': 'Phone number should be of type number',
        'any.required': 'Phone number is required'
    }),
    password: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'email is required'
    }),
    country: Joi.string().trim().required().messages({
        'string.base': 'Country should be a string',
        'any.required': 'Country is required'
    })
});

const loginSpec = Joi.object({
    email: Joi.string().email().trim().required().messages({
        'string.base': 'email should be a string',
        'any.required': 'email is required'
    }),
    password: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'email is required'
    })
});

const forgottenPasswordResetSpec = Joi.object({
    token: Joi.string().trim().required().messages({
        'string.base': 'token must be a valid string',
        'any.required': 'token is required'
    }), 
    newPassword: Joi.any().required().messages({
        'any.required': 'new password is required',
    }),
    confirmPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'password confirmation is required',
    }),
});

const forgottenPasswordSpec = Joi.object({
    email: Joi.string().email().trim().required().messages({
        'any.required': 'email is required'
    })
});

const changePasswordSpec = Joi.object({
    oldPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'old password is required'
    }), 
    newPassword: Joi.any().required().messages({
        'any.required': 'new password is required',
    }),
    confirmPassword: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
        'any.required': 'password confirmation is required',
    }),
});

const editprofileSpec =  Joi.object({
    firstName: Joi.string().min(2).max(30).trim().messages({
        'string.base': 'First name should be a string',
        'string.min': 'First name should be more than 1 character',
        'string.max': 'First name should not be more than 30 characters'
    }),
    lastName: Joi.string().min(2).max(30).trim().messages({
        'string.base': 'Last name should be a string',
        'string.min': 'Last name should be more than 1 character',
        'string.max': 'Last name should not be more than 30 characters'
    }),
    email: Joi.string().email().messages({
        'string.base': 'email should be a string'
    }),
    phoneNumber: Joi.number().messages({
        'number.base': 'Phone number should be of type number'
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
        'string.min': 'name should be more than 3 character',
        'string.max': 'name should not be more than 200 characters',
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

export {
    registrationSpec,
    loginSpec,
    forgottenPasswordResetSpec,
    forgottenPasswordSpec,
    changePasswordSpec,
    editprofileSpec,
    budgetSpec
}