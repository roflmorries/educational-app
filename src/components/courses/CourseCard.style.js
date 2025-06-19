import { Button } from "antd";
import styled from "styled-components";


export const CardWrapper = styled.div`
  display: flex;
  gap: 65px;
  justify-content: center;
  align-items: center;
  .buttons {
    display: flex;
    gap: 15px;
  }

  .info__container {
    display: flex;
    min-width: 45%;
    gap: 25px;
    justify-content: space-between;
  }
`

export const EditButton = styled(Button)`
background-color: #001529;
`

export const ViewButton = styled(Button)`
background-color: #001529;
`