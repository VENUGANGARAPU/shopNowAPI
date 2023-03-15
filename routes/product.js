const express =require('express');
const {verifytoken,verifyAuthera,verifyAutheraAdmin} =require('./verifyToken')
const router = express.Router();
const Products = require('../models/products');
const products = require('../models/products');


router.post("/",verifyAutheraAdmin,async (req,res)=>{

    const newProductData =  new Products(req.body);
    try {
        const addData = await newProductData.save();
        res.status(200).json(newProductData)
    } catch (error) {
        res.status(500).json(error)
    }

});
router.put('/:id',verifyAutheraAdmin,async (req,res)=>{

    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id,
            {
                $set :req.body,
            },
            {new:true},
            );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error)
    }

});

router.delete('/:id',verifyAutheraAdmin,async (req,res)=>{
    try {
        const remaindata = await Products.findOneAndDelete({id:req.params.id})
        res.status(200).json("product deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})


///getallProducts
router.get('/getProducts',async (req,res)=>{

    try {
        const getProducts =await Products.find();
        res.status(200).json(getProducts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
      const product = await products.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router


