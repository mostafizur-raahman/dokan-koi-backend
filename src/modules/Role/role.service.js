import Role from "./role.model.js";

const createRoleIntoDB = async (role) => {
    const newRole = await Role.create(role);
    return newRole;
};

const getRoleExists = async (role) => {
    const result = await Role.findOne({ name: role, isDeleted: false });
    return result;
};

const getAllRoleFromDB = async () => {
    const result = await Role.find({});
    return result;
};

export const roleServices = {
    createRoleIntoDB,
    getRoleExists,
    getAllRoleFromDB,
};
