import { Button, Form, Input, DatePicker, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../../store/features/studentsSlice";
import { selectById } from "../../store/selectors/studentsSelectors";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import dayjs from "dayjs";


export default function StudentForm({onSave, studentId}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const currentStudent = useSelector(state => selectById(state, studentId));
  const [form] = Form.useForm();

  useEffect(() => {
    if (studentId && currentStudent) {
      form.setFieldsValue({
        fullname: currentStudent.fullname,
        city: currentStudent.city,
        dateOfBirth: dayjs(currentStudent.dateOfBirth),
        gender: currentStudent.gender,
        telegram: currentStudent.telegram,
      });
      setDate(currentStudent.dateOfBirth);
    } else {
      form.resetFields();
      setDate("");
    }
  }, [studentId, currentStudent, form]);

  const handleStudentSaveNew = values => {
    const id = uuidv4();
    dispatch(addItem({...values, dateOfBirth: date, id}));
    onSave();
  }

  const handleStudentSaveEdit = values => {
    dispatch(editItem({...values, dateOfBirth: date, id: studentId}));
    onSave();
  }

  const onChangeDate = (data, dateString) => {
    setDate(dateString);
  };

  if (studentId && !currentStudent) {
    return null;
  }

  return (
    <Form
      form={form}
      name="students"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!studentId ? handleStudentSaveNew : handleStudentSaveEdit}
      autoComplete="off"
      className="students-form"
    >
      <h3>Create Course Form</h3>
      <Form.Item
        label="Fullname"
        name="fullname"
        initialValue={studentId && currentStudent.fullname}
        rules={[{ required: true, message: "Please enter your fullname!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        initialValue={studentId && currentStudent.city}
        rules={[{ required: true, message: "Please enter your city" }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
      label="Birth Day"
      name="dateOfBirth"
      initialValue={studentId && dayjs(currentStudent.dateOfBirth)}
      rules={[{ required: true }]}
      >
        <DatePicker onChange={onChangeDate} value={date ? dayjs(date, "YYYY-MM-DD") : null}/>
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select a gender!" }]}
        initialValue="male"
        >
        <Select
            options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'transformer', label: 'Transformer' },
            ]}
        />
      </Form.Item>

      <Form.Item
        label="Telegram"
        name="telegram"
        initialValue={studentId && currentStudent.telegram}
        rules={[{ required: true, message: "Please enter your Telegram" }]}
      >
        <Input/>
      </Form.Item>


      <Button type="primary" htmlType="submit">Save</Button>
      
    </Form>
  )
}