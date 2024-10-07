const express = require("express");
const router = new express.Router();
const items = require("../fakeDB");
const app = require("./app");
const ExpressError = require("../middleware/expressError");


// routes
router.get("/", (req,res)=>{
    return res.json({ items });
});

router.post("/", (req, res, next)=>{
    try{
        const { name , price } = req.body;
        if(!name || !price){
            throw new ExpressError("Missing name or price", 400);
        }
        const newItem = { name, price };
        items.push(newItem);
        return res.status(201).json({ item : newItem });
    }catch(err){
        return next(err);
    }
});

router.get("/:name", (req, res)=>{
    const { name } = req.params;
    const item = items.find(item => item.name === name);
    if (!item){
        throw new ExpressError("Item not found", 404);
    }
    return res.json({ item });
});

router.patch("/:name", (req, res)=>{
    const { name } = req.params ;
    const { price } = req.body;
    const item = items.find(item => item.name === name);
    if(!item){
        throw new ExpressError("Item not found", 404);
    }
    item.price = price || item.price;
    return res.json({ item });
});

router.delete("/:name", (req, res)=>{
    const { name } = req.params;
    const index = items.findIndex(item => item.name === name);
    if(index === -1){
        throw new ExpressError("Item not found", 404);
    }
    items.splice(index, 1);
    return res.status(204).json({ items });
});


module.exports = router;