import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    .content {
        min-width: 60%;
        display: flex;
        gap: 40px;
        /* justify-content: space-around; */
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