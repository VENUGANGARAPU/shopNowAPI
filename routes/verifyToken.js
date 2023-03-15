const jwt =require("jsonwebtoken")


const verifytoken = (req,res,next)=>{
    const authHeader =req.headers.token;
  
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.jwt,(err,user)=>{
            if(err){
                return res.status(403).json("token invalid")
            }
            req.user = user;
            next();
        })
    }
    else{
        console.log("step3")
        return res.status(401).json("You are not authenticated")
    }
}

const verifyAuthera =(req,res,next)=>{
    verifytoken(req,res,()=>{

        if(req.user.id === req.params.userid || req.user.isAdmin || req.params.id){
            next();
        }
        else{
            res.status(403).json("not allowede")
        }
    })

}

const verifyAutheraAdmin =(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("not an admin");
        }
    })

}

module.exports ={verifytoken,verifyAuthera,verifyAutheraAdmin}