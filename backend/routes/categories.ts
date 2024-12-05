import express from "express";
import db from "../db/conn";
import { ObjectId } from "mongodb";
import {DB_COLLECTION_CATEGORIES} from "../shared/const";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let newCollection = req.body;
    try {
        let result = await collection.insertMany(newCollection);
        res.status(201).send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
});

//TODO: метод апдейта одной сущности можно будет удалить, вроде не нужен
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $push: { name: req.body }
    };

    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

router.patch("/", async (req, res) => {
    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let query = req.body.map((category) => {
        return (
            { updateOne : {
                "filter" : { "_id" : new ObjectId(category._id) },
                "update" : { $set : { "name" : category.name } }
            }
        });
    });
    try {
        let result = await collection.bulkWrite(query);
        res.status(200).send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection(DB_COLLECTION_CATEGORIES);
    try {
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }

});


export default router;