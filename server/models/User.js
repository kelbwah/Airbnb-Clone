const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type:String, unique:true},
    firstName: String,
    lastName: String,
    password: String,
    picturePath: String,
    likedListings: [{type: mongoose.Schema.Types.ObjectId, ref:'RentingList'}],
    reservations: [{type: mongoose.Schema.Types.ObjectId, ref:'RentingList'}],
}, {timestamps: true}); 

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
