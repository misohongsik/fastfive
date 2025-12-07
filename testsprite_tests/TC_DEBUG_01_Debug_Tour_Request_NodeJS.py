const { submitTourRequest } = require('./app/tour/actions');
const FormData = require('form-data');
const assert = require('assert').strict;

// Mock next/navigation and next/headers if used in submitTourRequest
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => {},
    replace: () => {},
  }),
}));

jest.mock('next/headers', () => ({
  headers: () => new Map(),
}));

async function testSubmitTourRequest() {
  const formData = new FormData();
  formData.append('name', 'John Doe');
  formData.append('email', 'john.doe@example.com');
  formData.append('phone', '1234567890');
  formData.append('tourDate', '2025-12-15');
  formData.append('participants', '4');
  formData.append('notes', 'Looking forward to the tour!');

  try {
    const result = await submitTourRequest(formData);
    assert(result !== undefined && result !== null, 'submitTourRequest returned undefined or null');
  } catch (error) {
    assert.fail(`submitTourRequest threw an error: ${error}`);
  }
}

testSubmitTourRequest();
