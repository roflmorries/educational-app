import { useDispatch } from "react-redux";
import { signIn } from "../store/features/currentUserSlice";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import {CustomForm, StyledButton} from './LoginForm.style'

export default function LoginForm() {
  const dispatch = useDispatch();
  const [modal2Open, setModal2Open] = useState(true);

  const signIntoSite = values => {
    dispatch(signIn({ login: values.username }));
    setModal2Open(false)
  };

  return (
    <>
    <StyledButton type="primary" onClick={() => setModal2Open(true)}>
        Sign In
      </StyledButton>
    <Modal
      open={modal2Open}
      onOk={() => setModal2Open(false)}
      onCancel={() => setModal2Open(false)}
      footer={null}
      centered
    >
      <CustomForm
        onFinish={signIntoSite}
        autoComplete="off"
        className="login-form"
      >
        <h3>Login Form</h3>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </CustomForm>
    </Modal>
    </>
  );
}
