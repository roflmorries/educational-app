import styled from "styled-components";
import { Form } from "antd";


export const CustomForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ant-form-item {
    width: 100%; /* Устанавливаем ширину для всех элементов формы */
    max-width: 300px; /* Максимальная ширина */
  }

  .ant-input, 
  .ant-input-number, 
  .ant-picker, 
  .ant-select-selector, 
  .ant-input-textarea {
    width: 100%; /* Поля ввода занимают всю ширину родителя */
    height: 40px; /* Устанавливаем одинаковую высоту */
    border-radius: 5px; /* Скругленные углы */
  }

  .ant-input-textarea {
    height: auto; /* Для TextArea высота будет автоматически подстраиваться */
  }

  .ant-btn {
    width: 100%; /* Кнопка также занимает всю ширину */
    max-width: 300px; /* Максимальная ширина */
    margin-top: 15px;
  }
`