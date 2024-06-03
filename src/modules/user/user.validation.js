import Joi from "joi";

const userValidationSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required.",
        "string.empty": "ID cannot be empty.",
    }),
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
    emergencyContactNo: Joi.string().required().messages({
        "any.required": "Emergency contact number is required.",
    }),
    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required()
        .messages({
            "any.only":
                "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.",
            "any.required": "Blood group is required.",
        }),
    presentAddress: Joi.string().required().messages({
        "any.required": "Present address is required.",
    }),
    permanentAddress: Joi.string().required().messages({
        "any.required": "Permanent address is required.",
    }),
    guardian: Joi.object({
        fatherName: Joi.string().required().messages({
            "any.required": "Father's name is required.",
        }),
        motherName: Joi.string().required().messages({
            "any.required": "Mother's name is required.",
        }),
        fatherContactNo: Joi.string().required().messages({
            "any.required": "Father's contact number is required.",
        }),
        motherContactNo: Joi.string().required().messages({
            "any.required": "Mother's contact number is required.",
        }),
        fatherEmail: Joi.string().email().required().messages({
            "string.email": "Father's email must be a valid email address.",
            "any.required": "Father's email is required.",
        }),
        motherEmail: Joi.string().email().required().messages({
            "string.email": "Mother's email must be a valid email address.",
            "any.required": "Mother's email is required.",
        }),
    }).required(),
    profileImage: Joi.string().required().messages({
        "any.required": "Profile image is required.",
    }),
    isDeleted: Joi.boolean().default(false),
}).messages({
    "object.base": "Invalid input.", // If the input is not an object
    "any.unknown": "Invalid input.", // If there are unknown keys in the object
});

export default userValidationSchema;
