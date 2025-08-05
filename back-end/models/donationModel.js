import mongoose from "mongoose";

const DonationSchema = mongoose.Schema({
    donor: {type: mongoose.Schema.Types.ObjectId ,  ref: "User" , required : [true , "Donor name is required"], },
    phone: {type : Number},
    adress: {type : String},
    amount: {type :Number , required : [true , "Amount is required"]},
    message: {type: String}
}, {timestamps: true})   

export const donationModel = mongoose.model("Donation" , DonationSchema);