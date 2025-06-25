import { Router } from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = Router();

// let courses = [];
const COLLECTION = 'courses';

router.get("/create-indexes", async (req, res) => {
  try {
    const db = getDB();

    await db.collection(COLLECTION).createIndex({ name: 1 });
    await db.collection(COLLECTION).createIndex({ numberOfClasses: -1 });
    await db.collection(COLLECTION).createIndex({ name: 1, startDate: -1 });
    await db.collection(COLLECTION).createIndex({ "meta.info": 1 });
    await db.collection(COLLECTION).createIndex({ description: "text" });
    await db.collection(COLLECTION).createIndex({ description: 1 }, { sparse: true });

    res.json({ message: "indexes created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create indexes" });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const { skip = 0, limit = 20, sort = "name", order = "asc", fields } = req.query;

    const projection = fields ? fields.split(",").reduce((acc, f) => ({ ...acc, [f]: 1 }), {}) : {};
    const sortObj = { [sort]: order === "desc" ? -1 : 1 };

    const courses = await db.collection(COLLECTION).find({}, { projection }).sort(sortObj).skip(Number(skip)).limit(Number(limit)).toArray();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const course = await db.collection(COLLECTION).findOne({_id: new ObjectId(req.params.id)});
    if (!course) return res.status(404).json({ error: 'Course doesnt exists' });
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { name, description, startDate, numberOfClasses } = req.body;
    const newCourse = {
      name,
      description,
      startDate,
      numberOfClasses,
      students: [],
    };

    const result = await db.collection(COLLECTION).insertOne(newCourse);
    newCourse._id = result.insertedId;

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/many', async (req, res) => {
  try {
    const db = getDB();
    const courses = req.body;

    const result = await db.collection(COLLECTION).insertMany(courses);
    const inserted = courses.map((course, i) => ({
      ...course,
      _id: result.insertedIds[i]
    }));
    res.status(201).send(inserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.put('/assign-student/:courseId', async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) return res.status(400).json({ error: 'StudentID not received' });

    const db = getDB();
    const result = await db.collection(COLLECTION).findOneAndUpdate(
      { _id: new ObjectId(req.params.courseId)},
      { $addToSet: { students: studentId } },
      { returnDocument: 'after' }
    );
    const assignStudent = result.value || result.document || result;
  
    if (!assignStudent || !assignStudent._id) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(assignStudent);
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
      return res.status(400).json({ error: "filter and update required" });
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
    const { name, description, startDate, numberOfClasses } = req.body;

    const db = getDB();
    const result = await db.collection(COLLECTION).findOneAndUpdate(
      {_id: new ObjectId(req.params.id)},
      { $set: { name, description, startDate, numberOfClasses } },
      { returnDocument: 'after' }
    );
    const updatedCourse = result.value || result.document || result;
  
    if (!updatedCourse || !updatedCourse._id) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put('/replace/:id', async (req, res) => {
  try {
    const db = getDB();
    const replacement = req.body;
    const result = await db.collection(COLLECTION).replaceOne({ _id: new ObjectId(req.params.id) }, replacement);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Course doesnt exists' });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/many', async (req, res) => {
  try {
    const db = getDB();
    const deleteCounter = req.body;
    if (!deleteCounter) return res.status(400).json({ error: 'Missed deleteCounter' })
    const result = db.collection(COLLECTION).deleteMany(deleteCounter);
    res.json({ deleteCount: result.deleteCounter  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection(COLLECTION).deleteOne({_id: new ObjectId(req.params.id)});
    if (result.deletedCount === 0) return res.status(404).json({ error: "Course not found" });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
