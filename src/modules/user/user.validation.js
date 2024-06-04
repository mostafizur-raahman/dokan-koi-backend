import Joi from "joi";

const userValidationSchema = Joi.object({
    name: Joi.object({
        firstName: Joi.string().min(2).required().messages({
            "string.min":
                "First name must be at least {#limit} characters long.",
            "any.required": "First name is required.",
        }),
        middleName: Joi.string().optional(),
        lastName: Joi.string().min(2).required().messages({
            "string.min":
                "Last name must be at least {#limit} characters long.",
            "any.required": "Last name is required.",
        }),
    }).required(),
    role: Joi.string().required(),
    password: Joi.string().min(4).required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
    }),
    gender: Joi.string().valid("Male", "Female").required().messages({
        "any.only": "Gender must be either Male or Female.",
        "any.required": "Gender is required.",
    }),
    dob: Joi.string().required().messages({
        "any.required": "Date of birth is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
    }),
    contactNo: Joi.string().required().messages({
        "any.required": "Contact number is required.",
    }),
    presentAddress: Joi.string().required().messages({
        "any.required": "Present address is required.",
    }),
    permanentAddress: Joi.string(),
    profileImage: Joi.string(),
    isDeleted: Joi.boolean().default(false),
}).messages({
    "object.base": "Invalid input.", // If the input is not an object
    "any.unknown": "Invalid input.", // If there are unknown keys in the object
});

export default userValidationSchema;
