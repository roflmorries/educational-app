import { jest } from '@jest/globals';

// Используем ESM-синтаксис для mocking
jest.mock('mongodb', () => {
  return {
    ObjectId: jest.fn(id => ({
      toString: () => id,
      toHexString: () => id,
      equals: jest.fn(otherId => id === otherId)
    }))
  };
});