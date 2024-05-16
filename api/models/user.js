const mongoose = require("mongoose");
const {Schema}  = mongoose;

const UserSchema = new Schema({
    name : String,
    email: { type: String, required: true, unique: true, },
    idcard: String,
    number : String,
    password : String,
});



const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;

