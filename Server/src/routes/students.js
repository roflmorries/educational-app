import { Router } from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = Router();

// let students = [];
const COLLECTION = 'students';

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const students = await db.collection(COLLECTION).find({}).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
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
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error)
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
  }
});

export default router;