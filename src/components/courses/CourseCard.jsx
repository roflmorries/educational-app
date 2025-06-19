import { Button } from "antd";
import { CardWrapper, EditButton, ViewButton } from "./CourseCard.style";
import { useNavigate } from "react-router";


export default function CourseCard({ onEdit, onDelete, ...course }) {
  const navigate = useNavigate();

  const handleClickCourse = () => {
    navigate(`/course/${course._id}`)
  }

  return (
    <CardWrapper>
      <div className="info__container">
        <p>Name: {course.name}</p>
        <p>Description: {course.description}</p>
      </div>
      <div className="buttons">
        <ViewButton type="primary" onClick={handleClickCourse}>More</ViewButton>
        <EditButton type="primary" onClick={() => onEdit(course._id)}>Edit</EditButton>
        <Button color="danger" onClick={() => onDelete(course._id)}>Delete</Button>
      </div>
    </CardWrapper>
  )
}