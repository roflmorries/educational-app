export default {
  testEnvironment: 'node',
  transform: {},  // Убираем babel-jest трансформацию для ESM
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],  // Используем setupFilesAfterEnv вместо setupFiles
  moduleNameMapper: {
    '^../config/db.js$': '<rootDir>/src/tests/mocks/mock.js'
  }
};