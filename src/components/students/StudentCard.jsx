import { Button } from "antd";

export default function StudentCard({ onEdit, onDelete, ...student }) {

  return (
    <div>
      <div>
      Name: {student.fullname}
      City: {student.city}
      Telegram: {student.telegram}
      Gender: {student.gender}
      </div>
      <Button type="primary" onClick={() => onEdit(student.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(student.id)}>Delete</Button>
    </div>
  )
}