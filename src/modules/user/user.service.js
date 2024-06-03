import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../app/config/index.js";

const createUserInDB = async (user) => {
    // static metthod
    const existsUser = await User.isUserExist(user.id);
    if (existsUser) {
        throw new Error(`User already exists`);
    }

    //create user
    const newUser = await User.create(user);

    return newUser;
    // instance metthod
    // const user = new Student(student);
    // if (await user.isUserExist(student.id)) {
    //     throw new Error(`User already exists`);
    // }
    // const res = await user.save();
    // return res;
};

const getAllUserfromDb = async () => {
    const result = await User.aggregate([
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role",
            },
        },
        {
            $unwind: {
                path: "$role",
            },
        },
        {
            $addFields: {
                role: "$role.name",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                role: 1,
            },
        },
    ]);

    return result;
};

const getSingleUserFromDB = async (id) => {
    // check id isexits and aggreate with role
    const result = await User.aggregate([
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role",
            },
        },
        {
            $unwind: {
                path: "$role",
            },
        },
        {
            $addFields: {
                role: "$role.name",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                role: 1,
            },
        },
    ]);

    return result;
};

const deleteuserfromDB = async (id) => {
    const result = await User.updateOne(
        { _id: id },
        {
            isDeleted: true,
        }
    );

    return result;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, config.jwt_secret_key, {
        expiresIn: config.jwt_expires_in,
    });

    return token;
};
export const UserServices = {
    createUserInDB,
    getAllUserfromDb,
    getSingleUserFromDB,
    deleteuserfromDB,
    loginUser,
};
