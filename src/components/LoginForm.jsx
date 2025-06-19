import { useDispatch } from "react-redux";
import { signIn } from "../store/features/currentUserSlice";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { CustomForm, StyledButton } from './LoginForm.style'
import { schema } from "../validation/loginSchema";

const createYupSync = (fieldName) => ({
  async validator(_, value) {
    try {
      await schema.validateSyncAt(fieldName, { [fieldName]: value });
    } catch (e) {
      throw new Error(e.message);
    }
  },
});

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
          rules={[createYupSync('username')]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[createYupSync('password')]}
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
