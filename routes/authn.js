const express =require('express');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const router = express.Router();
const Auth = require('../models/auth');

router.post('/register',async (req,res)=>{
    const passowrd = req.body.password;
    const cryptoEncrpt =CryptoJS.AES.encrypt(passowrd,process.env.pass).toString();
    const authData = new Auth({
        username:req.body.username,
        email:req.body.email,
        password:cryptoEncrpt,
    });
    try {
        const saving = await authData.save();
        res.status(200).json(saving);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/login',async (req,res)=>{
    try {
        const userName = req.body.username;
        const user = await Auth.findOne({username :userName});

        if (!user) {
            res.status(401).json("Wrong username");
        } else {
            const decrept  = CryptoJS.AES.decrypt(user.password, process.env.pass);
            const Password = decrept.toString(CryptoJS.enc.Utf8);
            const {password,...others} =user._doc;
            if (Password !== req.body.password) {
                res.status(401).json("wrong password")
            } else {
                const acesstoken =jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin,
               },process.env.jwt,{expiresIn:"1d"});
               res.status(200).json({...others,acesstoken});
            }
        }

    } catch (error) {
        res.status(500).json(error);
    }

});


module.exports = router;
