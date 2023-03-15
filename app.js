const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors");
const dotenv = require('dotenv')
const app = express();
dotenv.config();
app.use(express.json());
const userRouter = require('./routes/username');
const AuthRouter = require('./routes/authn');
const ProductsRouter= require('./routes/product');
const OrderRouter =require('./routes/orders');
const CartrRouter = require('./routes/cart');
console.log(typeof(process.env.MONGO_URI))
mongoose.set("strictQuery", false);

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("connected")).
catch((error)=>{(console.log(error))})


const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use('/api/v1',userRouter);
app.use('/api/v1',AuthRouter);
app.use('/api/v1/product',ProductsRouter);
app.use('/api/v1/order',OrderRouter);
app.use('/api/v1/cart',CartrRouter);


app.listen(process.env.PORT || 5000,()=>{
    console.log("server running on port 5000...");
});