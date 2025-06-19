import { Button } from "antd";
import { Wrapper } from "./StudentCard.style";

export default function StudentCard({ onEdit, onDelete, ...student }) {

  return (
    <Wrapper>
      <div className="content">
        <p>Name: {student.fullname}</p>
        <p>City: {student.city}</p>
        <p>Telegram: {student.telegram}</p>
        <p>Gender: {student.gender}</p>
      </div>
      <div className="button__container">
        <Button type="primary" onClick={() => onEdit(student._id)}>Edit</Button>
        <Button color="danger" onClick={() => onDelete(student._id)}>Delete</Button>
      </div>
    </Wrapper>
  )
}