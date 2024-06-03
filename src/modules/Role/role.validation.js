import Joi from "joi";

// Define Joi validation schema
const roleValidationSchema = Joi.object({
    name: Joi.string()
        .valid("customer", "merchent", "admin")
        .required()
        .messages({
            "any.only": "Role must be one of [customer, merchent, admin].",
            "any.required": "Role is a required field.",
        }),
});

export default roleValidationSchema;
