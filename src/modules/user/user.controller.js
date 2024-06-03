import catchAsync from "../../app/utils/catchAsync.js";
import sendResponse from "../../app/utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import userValidationSchema from "./user.validation.js";

const createUser = async (req, res, next) => {
    try {
        //  validation schema
        const { error, value } = userValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        // will call sevice method
        const result = await UserServices.createUserInDB(value);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllUser = catchAsync(async (req, res, next) => {
    const result = await UserServices.getAllUserfromDb();

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result,
    });
});

const getSingleUser = catchAsync(async (req, res, next) => {
    const id = req.query.id;

    const result = await UserServices.getSingleUserFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student fetched successfully",
        data: result,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const id = req.query.id;

    await UserServices.deleteuserfromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student delete successfully",
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const result = await UserServices.loginUser(email, password);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successfully",
        data: result,
    });
});
export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    login,
};
