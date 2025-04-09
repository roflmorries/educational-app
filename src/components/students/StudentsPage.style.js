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