import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from "@reduxjs/toolkit";
  
  const initialState = {
    course: {
      name: "",
      description: "",
      startDate: "",
      amountOfLessons: 0,
      students: [],
    },
  };
  
  const serverUrl = "http://localhost:3000";
  
  export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
    const response = await fetch(`${serverUrl}/courses/${id}`);
    const result = await response.json();
    return result;
  });

  export const assignStudentToCourse = createAsyncThunk("course/assignStudent", async ({courseId, studentId}) => {
    const response = await fetch(`${serverUrl}/courses/assign-student/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({studentId})
    })
    const result = await response.json();
    return {courseId, studentId};
  })
  
  const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
      assignStudent: (state, action) => {
        state.course.students.push(action.payload.studentId);
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getCourse.fulfilled, (state, action) => {
        // console.log(action);
        state.course = { ...action.payload };
      });
      builder.addCase(assignStudentToCourse.fulfilled, (state, action) => {
        const { studentId } = action.payload;
        if (!state.course.students.includes(studentId)) {
          state.course.students.push(studentId);
        }
      });
    },
  });
  
  export const { assignStudent } = courseSlice.actions;
  
  export default courseSlice.reducer;
  