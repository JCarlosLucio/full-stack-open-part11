module.exports = {
  // Use Jest Projects to run both JSDom and Node tests in the same project
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['**/client/**/*.test.js?(x)'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/server/**/*.test.js'],
    },
  ],
  testTimeout: 60000, // Increase the global default Jest timeout
};
