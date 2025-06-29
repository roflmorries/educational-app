import { jest } from '@jest/globals';
import request from 'supertest';
import { mockCourses } from './mocks/mock.js';
import app from '../main.js';

beforeEach(() => {
  jest.clearAllMocks();
});


describe('GET /courses', () => {
  test('Get all courses from db', async () => {
    const mockCoursesData = [
      {_id: '1', name: 'Hillel FullStack JS', description: 'random description', numberOfClasses: 70, students: []},
      {_id: '2', name: 'Hillel JS Pro', description: 'random description', numberOfClasses: 30, students: []}
    ];

    mockCourses.toArray.mockResolvedValue(mockCoursesData);

    const res = await request(app).get('/courses').expect(200);

    expect(mockCourses.find).toHaveBeenCalled();
    expect(mockCourses.sort).toHaveBeenCalledWith({ name: 1 });
    expect(mockCourses.skip).toHaveBeenCalledWith(0);
    expect(mockCourses.limit).toHaveBeenCalledWith(20);

    expect(res.body).toHaveProperty('data', mockCoursesData);
    expect(res.body).toHaveProperty('pagination');
    expect(res.body.pagination).toHaveProperty('skip', 0);
    expect(res.body.pagination).toHaveProperty('limit', 20);
  });

  test('Get courses with using params', async () => {
    mockCourses.toArray.mockResolvedValue([]);
    await request(app).get('/courses?skip=10&limit=5&sort=startDate&order=desc&fields=name,description').expect(200);

    expect(mockCourses.find).toHaveBeenCalledWith({}, { projection: { name: 1, description: 1 } });
    expect(mockCourses.sort).toHaveBeenCalledWith({startDate: -1 });
    expect(mockCourses.skip).toHaveBeenCalledWith(10);
    expect(mockCourses.limit).toHaveBeenCalledWith(5);
  });

  test('Get courses with using cursor', async () => {
    mockCourses.hasNext.mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    
    mockCourses.next.mockResolvedValueOnce({ _id: '1', name: 'Course 1' })
      .mockResolvedValueOnce({ _id: '2', name: 'Course 2' });

    const res = await request(app)
      .get('/courses?useStream=true')
      .expect(200);

    expect(mockCourses.find).toHaveBeenCalled();
    expect(mockCourses.hasNext).toHaveBeenCalledTimes(3);
    expect(mockCourses.next).toHaveBeenCalledTimes(2);

    expect(res.headers['content-type']).toContain('application/json');
    expect(res.text).toContain('{"data":[');
    expect(res.text).toContain('"_id":"1"');
    expect(res.text).toContain('"_id":"2"');
    expect(res.text).toContain('"pagination":{"skip":0,"limit":20}}');
  });
});

describe('GET /courses/stats', () => {
  test('Return aggregated statistics', async () => {
    const mockData = {
      totalCourses: 10,
      avgStudentsPerCourse: 15.75,
      maxStudentsInCourse: 30,
      totalStudents: 157
    };

    mockCourses.aggregate.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([mockData])
    });

    const res = await request(app).get('/courses/stats').expect(200);

    expect(mockCourses.aggregate).toHaveBeenCalled();
    expect(res.body).toEqual(mockData)
  })
});

describe('GET /courses/:id', () => {
  test('Get current course', async () => {
    const mockData = {
      _id: '3213213213123',
      name: 'Test',
      description: 'Test',
      startDate: '2025-02-05',
      numberOfClasses: 777
    };

    mockCourses.findOne.mockResolvedValue(mockData);

    const res = await request(app).get('/courses/3213213213123').expect(200);

    expect(mockCourses.findOne).toHaveBeenCalled();
    expect(res.body).toEqual(mockData);
  });

  test('Course not found', async () => {
    mockCourses.findOne.mockResolvedValue(null);

    await request(app).get('/courses/1231231');

    expect(mockCourses.findOne).toHaveBeenCalled();
  });
});

describe('POST /courses', () => {
  test('Created new course', async () => {
    const newCourse = {
      name: 'Test course',
      description: 'Test',
      startDate: '2025-03-02',
      numberOfClasses: '999'
    };

    const expectedResponse = {
      _id: '6686868768',
      name: 'Test course',
      description: 'Test',
      startDate: '2025-03-02',
      numberOfClasses: '999',
      students: []
    };

    mockCourses.insertOne.mockResolvedValue({
      acknowledged: true,
      insertedId: '6686868768'
    });

    const res = await request(app).post('/courses').send(newCourse).expect(201);

    expect(res.body).toEqual(expectedResponse);
  });

  test('Missed required fields', async () => {
    const newCourse = {
      description: 'Test',
      startDate: '2025-03-02',
      numberOfClasses: '999'
    };

    const res = await request(app).post('/courses').send(newCourse).expect(400);

    expect(res.body).toHaveProperty('error', 'Missed required data');
    expect(mockCourses.insertOne).not.toHaveBeenCalled();
  });

  test('Missed required fields', async () => {
    const newCourse = {
      description: 'Test',
      startDate: '2025-03-02',
      numberOfClasses: '999',
      students: []
    }

    const res = await request(app).post('/courses').send(newCourse).expect(400);

    expect(res.body).toHaveProperty('error', 'Missed required data');
    expect(mockCourses.insertOne).not.toHaveBeenCalled();
  });
});

describe('PUT /courses/:id', () => {
  test('Successfully update course', async () => {
    const courseId = '1232l1k3l23kl';

    const updatedCourse = {
      name: 'New name',
      description: "lalala",
      startDate: '2025-01-01',
      numberOfClasses: 20,
    };

    const updatedDoc = {
      _id: courseId,
      ...updatedCourse,
      students: []
    };

    mockCourses.findOneAndUpdate.mockResolvedValue({
      value: updatedDoc
    });

    const res = await request(app).put(`/courses/${courseId}`).send(updatedCourse).expect(200);

    expect(mockCourses.findOneAndUpdate).toHaveBeenCalled();
    expect(res.body).toEqual(updatedDoc);
  });
  test('Course not found', async () => {
    const courseId = 'doensntexists';
    const updatedCourse = {
      name: 'Lalala',
      description: 'sdlasdqwp'
    };

    mockCourses.findOneAndUpdate.mockResolvedValue({});

    const res = await request(app).put(`/courses/${courseId}`).send(updatedCourse).expect(404);

    expect(res.body).toHaveProperty('error', 'Course not found');
  });
});

describe('DELETE /courses/:id', () => {
  test('Successfully deleted', async () => {
    mockCourses.deleteOne.mockResolvedValue({ deletedCount: 1 });

    await request(app).delete('/courses/32131231').expect(204);

    expect(mockCourses.deleteOne).toHaveBeenCalled();
  });
  test('Course not found', async () => {
    mockCourses.deleteOne.mockResolvedValue({ deletedCount: 0 });

    const res = await request(app).delete('/courses/0').expect(404);

    expect(mockCourses.deleteOne).toHaveBeenCalled();
    expect(res.body).toHaveProperty('error', 'Course not found');
  });
});

describe('PUT assign students to course', () => {
  test('Successfully assign student', async () => {
    const courseId = 'e1e23121w';
    const studentId = 'student3132j13k213j';
    
    const updatedCourse = {
      _id: courseId,
      name: 'Test Course',
      students: [studentId]
    };
    
    mockCourses.findOneAndUpdate.mockResolvedValue({
      value: updatedCourse
    });

    const res = await request(app).put(`/courses/assign-student/${courseId}`).send({studentId}).expect(200);

    expect(mockCourses.findOneAndUpdate).toHaveBeenCalled();
    
    const call = mockCourses.findOneAndUpdate.mock.calls[0];
    expect(call[1]).toEqual({ $addToSet: { students: studentId } });
    expect(call[2]).toEqual({ returnDocument: 'after' });
    
    expect(res.body).toEqual(updatedCourse);
  })
})