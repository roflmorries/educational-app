import { useState } from "react";
import { Button, Modal } from "antd";
import StudentsList from "./StudentsList";
import StudentForm from "./StudentForm";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../store/selectors/studentsSelectors";
import { deleteItem } from "../../store/features/studentsSlice";
import {StyledContainer} from './StudentsPage.style'


export default function StudentsPage() {
  const data = useSelector(selectAll)
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [editStudentId, setEditStudentID] = useState('');
  const dispatch = useDispatch();


  const showAddStudentForm = () => {
    setIsAddFormShown(true);
  }
 
  const hideAddStudentForm = () => {
    setIsAddFormShown(false);
  }

  const handleStudentEdit = studentId => {
    setIsEditModalShown(true);
    setEditStudentID(studentId);
  }

  const handleStudentDelete = (studentId) => {
    dispatch(deleteItem(studentId));
  }

  const hideEditModal = () => {
    setIsEditModalShown(false);
  }

  return (
    <StyledContainer>
      <div className="title">
        <h3>Students Page</h3>
      </div>
      <div className="button__container">
        <Button type="primary" onClick={showAddStudentForm}>Add Course</Button>
      </div>
      <Modal
      open={isAddFormShown}
      onCancel={() => isAddFormShown(false)} 
      footer={null}
      centered
      >
        <StudentForm onSave={hideAddStudentForm} />
      </Modal>
      <StudentsList items={data} onEdit={handleStudentEdit} onDelete={handleStudentDelete}  />

      <Modal title="Edit Student" open={isEditModalShown} onCancel={hideEditModal}>
        <StudentForm studentId={editStudentId} onSave={hideEditModal} />
      </Modal>
    </StyledContainer>
  )
}