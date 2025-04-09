import styled from "styled-components";
import { Layout, Menu } from "antd";

export const CustomLayout = styled(Layout)`
  height: 100vh;
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-right: 12%;
      font-size: 22px;
      font-weight: 450;
      color: #001529;
    }
  }
`
export const NavLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`

export const CustomMenu = styled(Menu)`
  background: none;
  display: flex;
  flex-direction: column;
  gap: 40px;
  li {
    span {
      color: white;
      text-align: center;
      font-size: 16px;
      font-weight: 550;
    }
  }

  .ant-menu-item-selected {
    background-color: transparent !important;
    color: inherit !important;
  }

  .ant-menu-item:focus {
    background-color: transparent !important;
  }
`
export const CustomHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  Auth {
    min-width: 20%;
  }
  .logo__nav {
    max-width: 80%;
    min-width: 80%;
    display: flex;
    justify-content: center;
    span {
      margin-right: 20%;
      font-size: 16px;
      font-weight: 550;
      span {
        /* color: orange; */
        background-color: white;
        color: #001529;
        border-radius: 3px;
        padding: 2px 4px 2px 4px;
      }
    }
  }
`;