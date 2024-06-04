import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../app/config/index.js";

const userSchema = new Schema(
    {
        name: {
            firstName: { type: String },
            middleName: { type: String },
            lastName: { type: String },
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: [true, "role id is required"],
        },
        password: { type: String },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        dob: { type: String },
        email: { type: String },
        contactNo: { type: String },

        presentAddress: { type: String },
        permanentAddress: { type: String },
        profileImage: { type: String },
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
    const result = await User.findOne({ _id: id });
    return result;
};

// // instance properties
// studentSchema.methods.isUserExist = async function (id) {
//     const result = await Student.findOne({ id: id });
//     return result;
// };

const User = model("User", userSchema);

export default User;
