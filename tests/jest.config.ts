import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir: '..',
  testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],

  coveragePathIgnorePatterns: [
  '<rootDir>/src/config/.*',
  '<rootDir>/src/routes/.*',
  '<rootDir>/src/schemas/.*',
  "/src/controllers/user.controller.ts",
  "/src/controllers/category.controller.ts",
  "/src/index.ts"
  ],




  // Cobertura: qué medir y dónde mostrarla
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],

  // Exigir mínimo 80% global
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  clearMocks: true,
};

export default config;
