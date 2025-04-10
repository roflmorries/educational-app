import { useState } from "react";
import { Button, Modal } from "antd";
import StudentsList from "./StudentsList";
import StudentForm from "./StudentForm";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../store/selectors/studentsSelectors";
import { deleteItem } from "../../store/features/studentsSlice";
import {StyledContainer, StyledModalContent} from './StudentsPage.style'



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
        <Button type="primary" onClick={showAddStudentForm}>Add Student</Button>
      </div>
      <Modal
      open={isAddFormShown}
      onCancel={hideAddStudentForm} 
      footer={null}
      centered
      >
        <StyledModalContent>
        <StudentForm onSave={hideAddStudentForm} />
        </StyledModalContent>
      </Modal>
      <StudentsList items={data} onEdit={handleStudentEdit} onDelete={handleStudentDelete}  />

      <Modal title="Edit Student" open={isEditModalShown} onCancel={hideEditModal} footer={null} centered>
        <StyledModalContent>
          <StudentForm studentId={editStudentId} onSave={hideEditModal} />
        </StyledModalContent>
      </Modal>
    </StyledContainer>
  )
}