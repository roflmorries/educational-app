import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    h3 {
      width: 200px;
      margin-right: 6%;
    }
    
  }
  .button__container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 50px;
    margin-bottom: 50px;
    .ant-btn {
      background: none;
      color: black;
      box-shadow: none;
      font-size: 16px;
      font-weight: 550;
      margin-right: 5%;
    }
  }
`

export const StyledModalContent = styled.div`
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .ant-modal-body {
    padding: 50px !important; 
  }
  .ant-col {
    padding: 0 !important;
    text-align: start;
  }
  
  .ant-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto !important;
  }

  .ant-form-item {
    width: 100%;
  }

  .ant-input,
  .ant-input-number,
  .ant-picker,
  .ant-select-selector,
  .ant-btn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
  }

  .ant-btn {
    margin-top: 20px;
    background-color: #001529;
  }
`