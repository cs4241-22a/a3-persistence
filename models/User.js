const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        id: { type: String, sparse: true},
        email: { 
            type: String, 
            required: [true, "Email is required!"], 
            unique: [true, "Email already registered"], 
            sparse: true },
        username: {type: String, required: true},
        displayName: String,
        profilePhoto: String,
        lastVisited: { type: Date, default: new Date() },
    },
    { timestamps: true }
);

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model("user", UserSchema, "users");