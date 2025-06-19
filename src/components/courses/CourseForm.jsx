import { Button, Form, Input, DatePicker, InputNumber} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveCourseAsync, updateCourseAsync } from "../../store/features/coursesSlice";
import { selectById } from "../../store/selectors/coursesSelectors";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import dayjs from "dayjs";
import { CustomForm } from "./CourseForm.style";
import { schema } from "../../validation/courseSchema";

const createYupSync = (fieldName) => ({
  async validator(_, value) {
    try {
      await schema.validateSyncAt(fieldName, { [fieldName]: value });
    } catch (e) {
      throw new Error(e.message);
    }
  },
});



export default function CourseForm({onSave, courseId}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const currentCourse = useSelector(state => selectById(state, courseId));
  const [form] = Form.useForm();

  useEffect(() => {
    if (courseId && currentCourse) {
      form.setFieldsValue({
        name: currentCourse.name,
        description: currentCourse.description,
        startDate: dayjs(currentCourse.startDate),
        numberOfClasses: currentCourse.numberOfClasses,
      });
      setDate(currentCourse.startDate);
    } else {
      form.resetFields();
      setDate("");
    }
  }, [courseId, currentCourse, form]);

  const handleCourseSaveNew = values => {
    // const id = uuidv4();
    const newCourse = {...values, startDate: date, numberOfClasses: values.numberOfClasses}
    // dispatch(addItem(newCourse));
    dispatch(saveCourseAsync(newCourse))
    onSave();
  }

  const handleCourseSaveEdit = values => {
    dispatch(updateCourseAsync({...values, startDate: date, numberOfClasses: values.numberOfClasses, _id: courseId}));
    onSave();
  }

  const onChangeDate = (data, dateString) => {
    setDate(dateString);
  };


  if (courseId && !currentCourse) {
    return null;
  }

  return (
    <CustomForm
      form={form}
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
        rules={[createYupSync('name')]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={courseId && currentCourse.description}
        rules={[createYupSync('description')]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
      label="Start Date"
      name="startDate"
      initialValue={courseId && dayjs(currentCourse.startDate)}
      rules={[createYupSync('startDate')]}
      >
        <DatePicker onChange={onChangeDate} value={date ? dayjs(date, "YYYY-MM-DD") : null}/>
      </Form.Item>

      <Form.Item
      label="Number of classes"
      name="numberOfClasses"
      initialValue={courseId && currentCourse.numberOfClasses || 10}
      rules={[createYupSync('numberOfClasses')]}
      >
        <InputNumber min={1} max={120} />
      </Form.Item>


      <Button type="primary" htmlType="submit">Save</Button>
      
    </CustomForm>
  )
}