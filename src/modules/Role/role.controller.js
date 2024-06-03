import catchAsync from "../../app/utils/catchAsync.js";
import sendResponse from "../../app/utils/sendResponse.js";
import { roleServices } from "./role.service.js";
import roleValidationSchema from "./role.validation.js";

const createRole = async (req, res, next) => {
    try {
        const { error, value } = roleValidationSchema.validate(req.body);

        const { name } = req.body;

        const exitsRole = await roleServices.getRoleExists(name);

        if (exitsRole) {
            return res.status(400).json({
                success: false,
                message: "Role already exists",
            });
        }

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        const result = await roleServices.createRoleIntoDB(value);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Role created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllRole = catchAsync(async (req, res, next) => {
    const result = await roleServices.getAllRoleFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Role fetched successfully",
        data: result,
    });
});

export const RoleController = {
    createRole,
    getAllRole,
};
