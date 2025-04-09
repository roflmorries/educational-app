import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";

import { selectAll } from "../../store/selectors/coursesSelectors";
import CoursesList from "./CoursesList";
import CourseForm from "./CourseForm";
import { deleteItem } from "../../store/features/coursesSlice";
import { Wrapper } from "./CoursesPage.style";



export default function CoursesPage() {
  const data = useSelector(selectAll);
  
  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  const dispatch = useDispatch();

  const showAddCourseForm = () => {
    setIsAddFormShown(true);
  }

  const hideAddCourseForm = () => {
    setIsAddFormShown(false);
  }

  const handleCourseEdit = courseId => {
    setIsEditModalShown(true);
    setEditCourseId(courseId);
  }

  const handleCourseDelete = courseId => {
    // todo: double-check if user wants to delete
    dispatch(deleteItem(courseId));
  }

  const hideEditModal = () => {
    setIsEditModalShown(false);
  }

  return (
    <Wrapper>
      <div className="upper__content">
        <h3>CoursesPage</h3>
      </div>
      <div className="button_container">
        <Button type="primary" onClick={showAddCourseForm}>Add Course</Button>
      </div>
      <Modal
      open={isAddFormShown}
      onCancel={() => isAddFormShown(false)} 
      footer={null}
      centered
      >
        <CourseForm onSave={hideAddCourseForm}/>
      </Modal>
      <CoursesList items={data} onEdit={handleCourseEdit} onDelete={handleCourseDelete}  />

      <Modal title="Edit Course" open={isEditModalShown} onCancel={hideEditModal} footer={null}>
        <CourseForm courseId={editCourseId} onSave={hideEditModal} />
      </Modal>
    </Wrapper>
  );
}
