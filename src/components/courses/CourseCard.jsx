import { Button } from "antd";

export default function CourseCard({ onEdit, onDelete, ...course }) {

  return (
    <div>
      {course.name}
      <Button type="primary" onClick={() => onEdit(course.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(course.id)}>Delete</Button>
    </div>
  )
}