const mongoose= require('mongoose');


const ProductSchema = new mongoose.Schema({

    title:{type:String,required:true},
    productName:{type:String,required:true,unique:true},
    companyname:{type:String,required:true},
    stockClearance:{type:String},
    img:{type:String},
    productDetails:{type:Object},
    description:{type:String},
    categories:{type:String},
    price:{type:String},
    quantity:{type:Number},
    rating:{type:Number},
    Topselling:{type:Boolean},
    bestOfCollection:{type:Boolean}
},{timestamps:true});


module.exports = mongoose.model('Product',ProductSchema);