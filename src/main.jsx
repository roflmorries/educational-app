import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.scss";
import App from "./App.jsx";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/*

+Sign in/out
+Course CRUD

HW: styling (using AntDesign)
HW: Students CRUD (fullname, dateOfBirth, gender, social networks links, city)
HW: Course - start date, amount of lessons

Next Lesson: Course <> Student assign
      CoursePage
      Ajax
      Formik

*/
