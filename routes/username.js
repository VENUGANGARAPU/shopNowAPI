const router = require('express').Router();
const CryptoJS = require("crypto-js");
const Auth = require('../models/auth');
const {verifytoken,verifyAuthera,verifyAutheraAdmin} = require('./verifyToken')

router.put('/:id',verifyAuthera,async(req,res)=>{
    if(req.body.password){
       req.body.password = CryptoJS.AES.encrypt(req.body.password,"nani").toString();
    }
    try {
        const updateUser = await Auth.findByIdAndUpdate(req.params.id,{
            $set :req.body
        },{new:true})
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(403).json(error);
    } 
});


router.delete('/:id',verifyAuthera,async(req,res)=>{
    try {
        await Auth.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleyedt")
    } catch (error) {
        res.status(500).json(error)
    }
})

//getAll users
router.get('/:id',verifyAutheraAdmin,async(req,res)=>{
    try {
       const users= await Auth.findById(req.params.id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get allUsers
router.get('/all/:id',verifyAutheraAdmin,async(req,res)=>{
    try {
        // req.query.new
        // to get only limited users we can use 
        const query = req.query.new;
       const users=query ? await Auth.find().limit(2) :await Auth.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= router