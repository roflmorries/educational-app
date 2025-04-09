import styled from "styled-components";
import { Button, Form, Input, Modal } from "antd";

export const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  h3 {
    margin-bottom: 50px;
    font-size: 18px;
  }
  input {
    text-align: center;
  }
  label {
    color: red;
    font-size: 14px !important;
  }
  .ant-btn {
    width: 272px;
    margin-top: 15px;
    background-color: #001529;
  }
`
export const StyledButton = styled(Button)`
background: none !important;
box-shadow: none;
font-weight: bolder;
`