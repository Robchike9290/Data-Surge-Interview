import '@testing-library/jest-dom'

// Provide a global fetch mock for tests
const fetchMock = jest.fn()

// @ts-expect-error - we intentionally attach a mock fetch to the Node global
global.fetch = fetchMock

