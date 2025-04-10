import styled from "styled-components";
import { Form } from "antd";


export const CustomForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ant-form-item {
    width: 100%;
    max-width: 300px;
  }

  .ant-input, 
  .ant-input-number, 
  .ant-picker, 
  .ant-select-selector, 
  .ant-input-textarea {
    width: 100%;
    height: 40px;
    border-radius: 5px;
  }

  .ant-input-textarea {
    height: auto;
  }

  .ant-btn {
    width: 100%;
    max-width: 300px;
    margin-top: 15px;
  }
`