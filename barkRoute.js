const router = require("express").Router();
const monk = require("monk");
const joi = require("joi");
const db = monk(process.env.MONGO_URI);
const barksCollection = db.get("barks");

const barkSchema = joi.object({
    name: joi.string().trim().required(),
    content: joi.string().trim().required(),
    date: joi.string().trim().required()
})

router.get("/", async (req, res, next) => {

    try {
        const barks = await barksCollection.find();
        return res.json(barks)
    } catch (err) {
        next(err)
    }

});

router.post("/bark", async (req, res, next) => {
    try {
        const { name, content } = req.body
        const bark = {
            name: name.toString(),
            content: content.toString()
        }
        if (barkSchema.validateAsync(bark)) {
            const insertedBark = await barksCollection.insert(bark)
            return res.json(insertedBark)
        } else next(err)
    } catch (err) {
        next(err);
    }
})

router.delete("/bark/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedBark = await barksCollection.findOne({
            "_id": id
        })
        await barksCollection.remove({
            "_id": id
        })
        return res.json({
            "deleted": deletedBark
        })

    } catch (err) {
        next(err)
    }
})



module.exports = router;
