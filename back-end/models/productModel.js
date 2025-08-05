import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    title: {type: String , required : [true , "Title is required"]},
    category: {type : String , required: [true , "Category is required"]},
    price: {type : String , required : [true , "Price is required"]},
    description: {type :String , required : [true , "Description is required"]},
    imageUrl: String,
    addedBy: {type: mongoose.Schema.Types.ObjectId , ref: "User"}
}, {timestamps: true})   

export const productModel = mongoose.model("Product" , productSchema);