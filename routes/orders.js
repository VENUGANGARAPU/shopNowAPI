const express =require('express');
const {verifytoken,verifyAuthera,verifyAutheraAdmin} =require('./verifyToken')
const router = express.Router();
const Order = require('../models/order');



router.post("/",verifytoken,async (req,res)=>{

    const newOrder =  new Order(req.body);
    try {
        const addData = await newOrder.save();
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).json(error)
    }

});


router.put('/:id',verifyAutheraAdmin,async (req,res)=>{
    try {
        const updateOrder = await Order.findByIdAndDelete(req.params.id,
            {
                $set :req.body,
            },
            {new:true},
            );
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error)
    }

});



router.get('/find/:userid',verifyAuthera,async (req,res)=>{
    try {
        const totalOrders = await Order.find({userId:req.params.userid});
        res.status(200).json(totalOrders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/',verifyAutheraAdmin,async (req,res)=>{
    try {
        const totalOrders = await Order.find();
        res.status(200).json(totalOrders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/admin/:id',verifyAutheraAdmin,async(req,res)=>{

    try {
        const getOrder =await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(getOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})






module.exports =router