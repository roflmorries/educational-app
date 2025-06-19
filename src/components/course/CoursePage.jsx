import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignStudentToCourse, getCourse } from '../../store/features/CourseSlice';
import { useParams } from 'react-router';
import { getAllStudents } from '../../store/features/studentsSlice';
import { Select, Button } from 'antd';
import { InformationContainer, UsersInformation, Container } from './CoursePage.style';



export default function CoursePage() {
    const {courseId} = useParams()
    const dispatch = useDispatch();
    const { course } = useSelector(state => state.course);
    const students = useSelector(state => state.students.entities);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        dispatch(getCourse(courseId))
        dispatch(getAllStudents());
    },[courseId]);

    const hadndleAssign = () => {
        if (selectedStudent) {
            dispatch(assignStudentToCourse({courseId, studentId: selectedStudent}))
        }
    }

  return (
    <Container>
      <InformationContainer>
      <div className='details__block'>
        <h2>Course name: {course.name}</h2>
        <p>Description: {course.description}</p>
        <p>Start date: {course.startDate}</p>
        <p>Amount of lessons: {course.numberOfClasses}</p>
        <p>Students in this course:</p>
      </div>
      <div className='users__block'>
        {course.students?.map((studentId) => {
          const student = students[studentId];
          return student ? <p key={studentId}>{student.fullname}</p> : null;
        })}
      </div>
      </InformationContainer>
        
      <UsersInformation>
        <h4>Select student to assign:</h4>
        <Select
        style={{ width: 200 }}
        placeholder="Select a student"
        onChange={(value) => setSelectedStudent(value)}
        options={Object.values(students || {}).map((student) => ({
          value: student._id,
          label: student.fullname,
        }))}
      />
      <Button type="primary" onClick={hadndleAssign} style={{ marginLeft: 10 }}>
        Assign
      </Button>
      </UsersInformation>
    </Container>
  )
}
