const router = require("express").Router();
const monk = require("monk");
const joi = require("joi");
const db = monk(process.env.MONGO_URI);
const barksCollection = db.get("barks");

const barkSchema = joi.object({
    name: joi.string().trim().required(),
    content: joi.string().trim().required(),
    date: joi.object()
})

router.get("/", async (req, res, next) => {

    try {
        const barks = await barksCollection.find();
        console.log(barks.length)
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
            content: content.toString(),
            date: [{"string": new Date()},{"milliseconds":  Date.now()}]
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
