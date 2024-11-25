import express from "express";
import db from "../db/conn";
import { ObjectId } from "mongodb";
import {DB_COLLECTION_CATEGORIES} from "../shared/const";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let results = await collection.find({})
        .toArray();
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
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $push: { name: req.body }
    };

    let collection = await db.collection(DB_COLLECTION_CATEGORIES);
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection(DB_COLLECTION_CATEGORIES);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});


export default router;