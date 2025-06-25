import { Router } from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = Router();

// let students = [];
const COLLECTION = 'students';

router.get("/create-indexes", async (req, res) => {
  try {
    const db = getDB();
    await db.collection(COLLECTION).createIndex({ fullname: 1 });
    await db.collection(COLLECTION).createIndex({ city: -1 });
    await db.collection(COLLECTION).createIndex({ fullname: 1, city: 1 });
    await db.collection(COLLECTION).createIndex({ "meta.info": 1 });
    await db.collection(COLLECTION).createIndex({ telegram: 1 }, { unique: true, sparse: true });
    await db.collection(COLLECTION).createIndex({ fullname: "text", city: "text" });
    res.json({ message: "indexes created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create indexes" });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const { skip = 0, limit = 20, sort = "fullname", order = "asc", fields } = req.query;

    const projection = fields ? fields.split(",").reduce((acc, f) => ({ ...acc, [f.trim()]: 1 }), {}) : {};
    const sortObj = { [sort]: order === "desc" ? -1 : 1 };

    const students = await db.collection(COLLECTION).find({}, { projection }).sort(sortObj).skip(Number(skip)).limit(Number(limit)).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const student = await db.collection(COLLECTION).findOne({_id: new ObjectId(req.params.id)});
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDB()

    const { fullname, city, dateOfBirth, gender, telegram } = req.body;
    const newStudent = {
    fullname,
    city,
    dateOfBirth,
    gender,
    telegram
  };

  const result = await db.collection(COLLECTION).insertOne(newStudent);
  newStudent._id = result.insertedId;
  res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/many", async (req, res) => {
  try {
    const db = getDB();
    const students = req.body;
    const result = await db.collection(COLLECTION).insertMany(students);
    const inserted = students.map((student, i) => ({
      ...student,
      _id: result.insertedIds[i]
    }));
    res.status(201).json(inserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/many", async (req, res) => {
  try {
    const db = getDB();
    const { filter, update } = req.body;
    if (!filter || !update) {
      return res.status(400).json({ error: "missed filter and update" });
    }
    const result = await db.collection(COLLECTION).updateMany(filter, { $set: update });
    res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const { fullname, city, dateOfBirth, gender, telegram } = req.body;
    const result = await db.collection(COLLECTION).findOneAndUpdate(
      { _id: new ObjectId(req.params.id)},
      { $set: { fullname, city, dateOfBirth, gender, telegram }},
      { returnDocument: 'after' }
    );
    const updatedStudent = result.value || result.document || result;
  
    if (!updatedStudent || !updatedStudent._id) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/replace/:id", async (req, res) => {
  try {
    const db = getDB();
    const replacement = req.body;
    const result = await db.collection(COLLECTION).replaceOne({ _id: new ObjectId(req.params.id) }, replacement);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Student doesnt exists' });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/many", async (req, res) => {
  try {
    const db = getDB();
    const filter = req.body;
    if (!filter) return res.status(400).json({ error: 'Missed filter' });
    const result = await db.collection(COLLECTION).deleteMany(filter);
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({error: 'Student not found' });
    res.status(204).send()
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;