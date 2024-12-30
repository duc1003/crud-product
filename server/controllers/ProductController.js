import mongoose from 'mongoose';
import Product from '../models/product/product.model.js';


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (err) {
        //log error
        console.log("Error in get all products: ", err.message);
        res.status(501).json({success: false, data: "can't not get data"}); 
    };
};

const addProduct = async (req, res) => {
    const product = req.body; // received data from user
    
    if(!product.name || !product.price || !product.image){
        res.status(400).json({success : false, message: "Please provide full fields."});
    }

    const newProduct = new Product(product);
    
    try {
        newProduct.save();
        res.status(201).json({success : true, data: newProduct});
    } catch (err) {
        // log error
        console.log("Error in creating new Product:", err.message);
        
        res.status(501).json({success : false, message:"Server error"});
    };
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message: "Invalid Product ID"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json({success : true, message: "Product deleted successfully"});
    } catch (err) {
        // log error
        console.log("Error in deleting Product:", err.message);
        res.status(501).json({success : false, message:"Server error"});  
    };
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message: "Invalid Product ID"});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(201).json({success : true, data: updateProduct});
    } catch (err) {
        //log error
        console.log("Error in updating Product:", err.message);
        res.status(500).json({success : false, message:"Product updated failed"});
    };

};

export { addProduct, deleteProduct, getAllProducts, updateProduct };