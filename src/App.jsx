import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router";

const { Header, Content } = Layout;

import "./App.scss";
import Auth from "./components/Auth";
import CoursesPage from "./components/courses/CoursesPage";
import CoursePage from "./components/course/CoursePage";
import StudentsPage from "./components/students/StudentsPage";
import Sider from "antd/es/layout/Sider";
import { CustomLayout, NavLayout, CustomMenu, CustomHeader } from './App.styled'



function App() {
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const items = [
    {
      key: "courses",
      label: "Courses",
    },
    {
      key: "students",
      label: "Students",
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <>
      {/* <Flex gap="middle" wrap> */}
        <NavLayout>
          <CustomHeader className="header">
            <Auth />
            <div className="logo__nav"><span>Educational<span>App</span></span></div>
          </CustomHeader>
        </NavLayout>
        <CustomLayout>
          <Sider width="14%">
            {user.isAuth && (
              <CustomMenu
                onClick={handleMenuClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["courses"]}
                mode="inline"
                items={items}
              />
            )}
          </Sider>
          <Content>
            {!user.isAuth && <p>To proceed you need to sign in</p>}
            {user.isAuth && (
              <Routes>
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/students" element={<StudentsPage />} />
              </Routes>
            )}
          </Content>
        </CustomLayout>
      {/* </Flex> */}
    </>
  );
}

export default App;
