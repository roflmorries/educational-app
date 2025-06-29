import { jest } from '@jest/globals';
import request from 'supertest';
import { mockStudents } from './mocks/mock.js';
import app from '../main.js';


beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /students', () => {
  test('Get all students', async () => {
      const mockData = [
        {
          _id: '1', 
          fullname: 'John Doe', 
          city: 'NY', 
          dateOfBirth: '1990-01-01',
          gender: 'male',
          telegram: '@johndoe'
        },
        {
          _id: '2', 
          fullname: 'Jack Daniels', 
          city: 'LA', 
          dateOfBirth: '1992-05-15',
          gender: 'male',
          telegram: '@daniels'
        }
      ];

      mockStudents.toArray.mockResolvedValue(mockData);

      const res = await request(app).get('/students').expect(200);

      expect(mockStudents.find).toHaveBeenCalled();
      expect(mockStudents.sort).toHaveBeenCalledWith({ fullname: 1 });
      expect(mockStudents.skip).toHaveBeenCalledWith(0);
      expect(mockStudents.limit).toHaveBeenCalledWith(20);

      expect(res.body).toHaveProperty('data', mockData);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('skip', 0);
      expect(res.body.pagination).toHaveProperty('limit', 20);
  });

  test('Get students with using params', async () => {
    mockStudents.toArray.mockResolvedValue([]);

    await request(app).get('/students?skip=10&limit=5&sort=city&order=desc&fields=fullname,city').expect(200);

    expect(mockStudents.find).toHaveBeenCalledWith({}, { projection: { fullname: 1, city: 1 } });
    expect(mockStudents.sort).toHaveBeenCalledWith({ city: -1 });
    expect(mockStudents.skip).toHaveBeenCalledWith(10);
    expect(mockStudents.limit).toHaveBeenCalledWith(5);
  });

  test('Get students with using cursor', async () => {
    mockStudents.hasNext.mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    mockStudents.next.mockResolvedValueOnce({ _id: '1', fullname: 'Student 1' })
      .mockResolvedValueOnce({ _id: '2', fullname: 'Student 2' });

    const res = await request(app).get('/students?useStream=true').expect(200);

    expect(mockStudents.find).toHaveBeenCalled();
    expect(mockStudents.hasNext).toHaveBeenCalledTimes(3);
    expect(mockStudents.next).toHaveBeenCalledTimes(2);

    expect(res.headers['content-type']).toContain('application/json');
    expect(res.text).toContain('{"data":[');
    expect(res.text).toContain('"_id":"1"');
    expect(res.text).toContain('"_id":"2"');
    expect(res.text).toContain('"pagination":{"skip":0,"limit":20}}');
  });
});

describe('GET /students/stats', () => {
  test('Get student statistic', async () => {
    const mockData = {
      totalStudents: 100,
      oldestBirth: '1985-03-15',
      youngestBirth: '2005-07-22',
      averageYear: 1995
    }

    mockStudents.aggregate.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([mockData])
    });

    const res = await request(app).get('/students/stats').expect(200);

    expect(mockStudents.aggregate).toHaveBeenCalled;
    expect(res.body).toEqual({summary: mockData});
  });
});

describe('GET /students/:id', () => {
  test('Get students by id', async () => {
     const mockData = {
      _id: '3213213213123',
      fullname: 'John Doe',
      city: 'SF',
      dateOfBirth: '1995-05-15',
      gender: 'male',
      telegram: '@doedoe'
    };
    mockStudents.findOne.mockResolvedValue(mockData);

    const res = await request(app).get('/students/3213213213123').expect(200);

    expect(mockStudents.findOne).toHaveBeenCalled();
    expect(res.body).toEqual(mockData);
  });

  test('student not found', async () => {
    mockStudents.findOne.mockResolvedValue(null);

    const res = await request(app).get('/students/123213').expect(404);

    expect(mockStudents.findOne).toHaveBeenCalled();
    expect(res.body).toHaveProperty('error', 'Student not found')
  });
});

describe('POST /student', () => {
  test('create new student', async () => {
    const newStudent = {
      fullname: 'Jack NotDaniels',
      city: 'NY',
      dateOfBirth: '2000-01-01',
      gender: 'male',
      telegram: '@daniels'
    };

    const expectedResponse = {
      _id: '3j123jk123j12lk3k21l',
      ...newStudent
    };
    mockStudents.insertOne.mockResolvedValue({
      acknowledged: true,
      insertedId: '3j123jk123j12lk3k21l'
    });

    const res = await request(app).post('/students').send(newStudent).expect(201);

    expect(mockStudents.insertOne).toHaveBeenCalledWith(newStudent);
    expect(res.body).toEqual(expectedResponse);
  });
});

describe('POST /students/many', () => {
  test('create multiple studentts', async () => {
    const newStudents = [
      {
        fullname: 'Jack Daniels',
        city: 'LA',
        dateOfBirth: '1998-03-15',
        gender: 'male',
        telegram: '@daniels'
      },
      {
        fullname: 'JohnDoe',
        city: 'SF',
        dateOfBirth: '1999-07-22',
        gender: 'male',
        telegram: '@doe'
      }
    ]
    mockStudents.insertMany.mockResolvedValue({
      acknoledged: true,
      insertedIds: {
        '0': 'ladsjdkasjdlaksjdals12312',
        '1': 'j3kl12j3lk12j3j12k3jl12j31'
      }
    });

    const res = await request(app).post('/students/many').send(newStudents).expect(201);

    expect(mockStudents.insertMany).toHaveBeenCalledWith(newStudents);

    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('_id', 'ladsjdkasjdlaksjdals12312')
    expect(res.body[1]).toHaveProperty('_id', 'j3kl12j3lk12j3j12k3jl12j31')
  })
})