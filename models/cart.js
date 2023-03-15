
const mongoose =require('mongoose');


const Cartdata = new mongoose.Schema({
    userId:{type:String,unique:true},
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
            img:{type:String},
            price:{type:String},
            productName:{type:String}
        },
    ],
},{timestamps:true});

module.exports= new mongoose.model('carts',Cartdata);
