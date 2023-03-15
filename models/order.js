
const mongoose =require('mongoose');


const orderdata = new mongoose.Schema({
    userId:{type:String},
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
            img:{type:String,},
            productName:{type:String},
            price:{type:String}
        },
    ],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"}
},{timestamps:true});

module.exports= new mongoose.model('Order',orderdata);
