module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).(jsx|js)'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  globals: {
    NODE_ENV: 'test',
  },
  transform: {
    '^.+\\.(jsx|js)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file',
  },
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es|react)/)'], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
  moduleNameMapper: {
    'aurelia-(.*)': '<rootDir>/node_modules/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts?(x)', 'src/**/*.js?(x)'],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text'],
};

// // For a detailed explanation regarding each configuration property, visit:
// // https://jestjs.io/docs/en/configuration.html

// module.exports = {
//   browser: true,
//   coverageReporters: ['json', 'text-summary', 'lcov', 'clover'],
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
//   transform: {
//     '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
//   },
//   testMatch: ['./test/**/*.spec.(jsx|js)'],
//   frameworks: [ ],
//   setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
// };
