module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/client/'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/client/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/config/**',
    '!src/**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
}

