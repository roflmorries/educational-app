import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .upper__content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    h3 {
      width: 100px;
      margin-right: 12%;
    }
    
  }
  .button_container {
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