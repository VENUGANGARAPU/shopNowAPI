const express =require('express');
const {verifytoken,verifyAuthera,verifyAutheraAdmin} =require('./verifyToken')
const router = express.Router();
const carts = require('../models/cart')


router.post("/",verifytoken,async (req,res)=>{

    const newCartData =  new carts(req.body);
    try {
        const addData = await newCartData.save();
        res.status(200).json(newCartData);
    } catch (error) {
        res.status(500).json(error)
    }

});


router.put('/:id',verifyAuthera,async (req,res)=>{

 
    try {
        const updatedCart = await carts.findByIdAndUpdate({_id:req.params.id},
            {
                $set :req.body,
            },
            {new:true},
            );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }

});


router.delete('/:id',verifyAuthera,async(req,res)=>{

    try {
        const getcarts =await carts.findByIdAndDelete({userId:req.params.id});
        res.status(200).json(getcarts);
    } catch (error) {
        res.status(500).json(error);
    }
})
///getallcarts
router.get('/getcarts/:userid',verifyAuthera,async(req,res)=>{

    try {
        const getcarts =await carts.findOne({userId:req.params.userid});
        res.status(200).json(getcarts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/admin',verifyAutheraAdmin,async(req,res)=>{

    try {
        const getcarts =await carts.find();
        res.status(200).json(getcarts);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports=router


