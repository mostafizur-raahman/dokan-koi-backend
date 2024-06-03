import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../app/config/index.js";

const userSchema = new Schema(
    {
        id: { type: String, unique: true },
        name: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true },
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: [true, "role id is required"],
        },
        password: { type: String, required: true },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        dob: { type: String, required: true },
        email: { type: String, required: true },
        contactNo: { type: String, required: true },
        emergencyContactNo: { type: String, required: true },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            required: true,
        },
        presentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true },
        guardian: {
            fatherName: { type: String, required: true },
            motherName: { type: String, required: true },
            fatherContactNo: { type: String, required: true },
            motherContactNo: { type: String, required: true },
            fatherEmail: { type: String, required: true },
            motherEmail: { type: String, required: true },
        },
        profileImage: { type: String, required: true },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_SALT_ROUNDS)
    );

    next();
});

// post save middleware
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

userSchema.pre("find", async function (next) {
    this.where({ isDeleted: false });
    next();
});

userSchema.pre("findOne", async function (next) {
    this.where({ isDeleted: false });
    next();
});

userSchema.pre("aggregate", async function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

// static properties
userSchema.statics.isUserExist = async function (id) {
    const result = await User.findOne({ id: id });
    return result;
};

// // instance properties
// studentSchema.methods.isUserExist = async function (id) {
//     const result = await Student.findOne({ id: id });
//     return result;
// };

const User = model("User", userSchema);

export default User;
