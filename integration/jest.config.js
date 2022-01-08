const config = {
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/node_modules/', '/integration/'],
  displayName: 'integration',
  maxWorkers: 1,
  moduleDirectories: ['node_modules'],
  setupFiles: ['../testSetup.js'],
  snapshotSerializers: ['jest-snapshot-serializer-ansi'],
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.mjs$': 'babel-jest',
  },
  /** Also transform ESM packages in `node_modules` */
  transformIgnorePatterns: [],
}

export default config
