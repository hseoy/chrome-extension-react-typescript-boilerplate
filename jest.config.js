module.exports = {
  testEnvironment: 'node',
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
  roots: ['src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
