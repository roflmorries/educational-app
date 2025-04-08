import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router";

const { Header, Content } = Layout;

import "./App.scss";
import Auth from "./components/Auth";
import CoursesPage from "./components/courses/CoursesPage";
import StudentsPage from "./components/StudentsPage";
import Sider from "antd/es/layout/Sider";

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
    console.log(key);
    navigate(`/${key}`);
  };

  return (
    <>
      {/* <Flex gap="middle" wrap> */}
        <Layout>
          <Header className="header">
            <Auth />
          </Header>
        </Layout>
        <Layout>
          <Sider width="15%">
            {user.isAuth && (
              <Menu
                onClick={handleMenuClick}
                style={{ width: 256 }}
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
                <Route path="/students" element={<StudentsPage />} />
              </Routes>
            )}
          </Content>
        </Layout>
      {/* </Flex> */}
    </>
  );
}

export default App;
