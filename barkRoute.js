const router = require("express").Router();
const monk = require("monk");
const joi = require("joi");
const db = monk(process.env.MONGO_URI);
const barksCollection = db.get("barks");

router.get("/",  (req, res, next) => {
    res.json({
        "message": "Hello fucking vercel!"
    })
    // try{
    //     const barks = await barksCollection.find();
    //     return res.json(barks)

    // }catch(err){
    //     next(err)
    // }

});



module.exports = router;
