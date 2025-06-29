import { jest } from '@jest/globals';

const mockCollections = {
  courses: {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    insertMany: jest.fn(),
    updateOne: jest.fn(),
    updateMany: jest.fn(),
    findOneAndUpdate: jest.fn(),
    replaceOne: jest.fn(),
    deleteOne: jest.fn(),
    deleteMany: jest.fn(),
    aggregate: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
    hasNext: jest.fn(),
    next: jest.fn(),
    forEach: jest.fn()
  },
  students: {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    insertMany: jest.fn(),
    updateOne: jest.fn(),
    updateMany: jest.fn(),
    findOneAndUpdate: jest.fn(),
    replaceOne: jest.fn(),
    deleteOne: jest.fn(),
    deleteMany: jest.fn(),
    aggregate: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
    hasNext: jest.fn(),
    next: jest.fn(),
    forEach: jest.fn()
  }
};

const mockDB = {
  collection: jest.fn((name) => {
    return mockCollections[name] || {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue([])
    };
  })
};


export const connectDB = jest.fn().mockResolvedValue(mockDB);
export const getDB = jest.fn().mockReturnValue(mockDB);

export const mockCourses = mockCollections.courses;
export const mockStudents = mockCollections.students;