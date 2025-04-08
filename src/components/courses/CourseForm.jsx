import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../../store/features/coursesSlice";
import { selectById } from "../../store/selectors/coursesSelectors";

export default function CourseForm({onSave, courseId}) {
  const dispatch = useDispatch();

  const currentCourse = useSelector(state => selectById(state, courseId));

  const handleCourseSaveNew = values => {
    const id = Date.now();
    dispatch(addItem({...values, id}));
    onSave();
  }

  const handleCourseSaveEdit = values => {
    dispatch(editItem({...values, id: courseId}));
    onSave();
  }

  return (
    <Form
      name="course"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!courseId ? handleCourseSaveNew : handleCourseSaveEdit}
      autoComplete="off"
      className="course-form"
    >
      <h3>Create Course Form</h3>
      <Form.Item
        label="Name"
        name="name"
        initialValue={courseId && currentCourse.name}
        rules={[{ required: true, message: "Please input the course name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={courseId && currentCourse.description}
        rules={[{ required: false }]}
      >
        <TextArea />
      </Form.Item>

      <Button type="primary" htmlType="submit">Save</Button>
      
    </Form>
  )
}