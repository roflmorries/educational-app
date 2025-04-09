import { Button } from "antd";
import { CardWrapper } from "./CourseCard.style";


export default function CourseCard({ onEdit, onDelete, ...course }) {

  return (
    <CardWrapper>
      <p>Name: {course.name}</p>
      <p>Description: {course.description}</p>
      <div className="buttons">
      <Button type="primary" onClick={() => onEdit(course.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(course.id)}>Delete</Button>
      </div>
    </CardWrapper>
  )
}