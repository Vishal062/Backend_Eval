const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//Create a schema for a usercollection

const userSchema = new.mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profil_pic: { type: URL, required: false },
    roles: { type: String, required: true },
}, {
    versionKey: false,
    timestamp:true
});

//Create and Update
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
});

//CheckPassword
userSchema.methods.checkPassword = function (password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

//Connect the schema to the user collection

const User = mongoose.model("user", userSchema);    //Users collection

module.exports = User;