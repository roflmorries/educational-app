import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

let courses = [];

router.get("/", (req, res) => {
  res.json(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

router.post("/", (req, res) => {
  const { name, description, startDate, numberOfClasses } = req.body;
  const newCourse = {
    id: uuidv4(),
    name,
    description,
    startDate,
    numberOfClasses,
    students: [],
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

router.put('/assign-student/:courseId', (req, res) => {
  const course = courses.find((c) => c.id === req.params.courseId);
  if (!course) return res.status(404).json({ error: "Course not found" });

  const newStudentId = req.body.studentId;
  if (!newStudentId) {
    return res.status(400).json({error: 'bad request'});
  }

  course.students.push(newStudentId);
  res.json(course);
})

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  course.name = req.body.name || course.name;
  course.description = req.body.description || course.description;
  course.startDate = req.body.startDate || course.startDate;
  course.numberOfClasses = req.body.numberOfClasses || course.numberOfClasses;
  res.json(course);
});

router.delete("/:id", (req, res) => {
  courses = courses.filter((c) => c.id !== req.params.id);
  res.status(204).send();
});

export default router;
