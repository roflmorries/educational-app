import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    .content {
        width: 70%;
        display: flex;
        gap: 20px;
        justify-content: space-around;
        p {
            width: auto;
            margin: 0 !important;
        }
    }
  .button__container {
    display: flex;
    flex-direction: row !important;
  }
`