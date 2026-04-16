# CI/CD Pipeline Setup Guide

## Overview
This project now includes a complete CI/CD pipeline using GitHub Actions for automated testing and security audits.

## What's Included

### 1. GitHub Actions Workflow (`.github/workflows/test.yml`)
- **Automated Testing**: Runs on every push to `main` and `develop` branches and on all pull requests
- **Multi-version Testing**: Tests against Node.js 16.x, 18.x, and 20.x
- **Security Audit**: Runs npm audit to check for vulnerabilities
- **Code Coverage**: Generates and uploads coverage reports to Codecov

### 2. Jest Testing Framework
- **Configuration**: `jest.config.js` - Configured for Node.js environment
- **Coverage Tracking**: Minimum 50% coverage threshold for branches, functions, lines, and statements
- **Test Files**: Located in `tests/` directory

### 3. Available NPM Scripts

```bash
# Run tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# CI mode (generates coverage for CI/CD)
npm run test:ci
```

## Getting Started

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Write tests** - Create test files in `tests/` directory with `.test.js` extension

3. **Run tests locally**
   ```bash
   npm test
   npm run test:coverage  # See coverage report
   ```

### GitHub Setup

1. Push this repository to GitHub
2. The workflow automatically triggers on:
   - Any push to `main` or `develop` branches
   - Any pull request to these branches

3. **Optional**: Set up Codecov integration for coverage tracking
   - Visit https://codecov.io
   - Connect your GitHub account
   - The CI will automatically upload coverage reports

## Test File Examples

### Creating a New Test File
Create a file in `tests/` directory with `.test.js` extension:

```javascript
// tests/user.test.js
const { /* your exports */ } = require('../controllers/user');

describe('User Controller', () => {
  test('should create a new user', () => {
    // Your test code here
    expect(result).toBe(expected);
  });
});
```

### Sample Tests Included
- `tests/sample.test.js` - Basic test examples
- `tests/app.test.js` - Application configuration tests

## CI/CD Workflow Steps

1. **Checkout Code** - Clones your repository
2. **Setup Node.js** - Installs specified Node versions
3. **Install Dependencies** - Runs `npm ci`
4. **Run Linting** - If lint script exists
5. **Run Tests** - Executes all test files
6. **Upload Coverage** - Sends results to Codecov
7. **Security Audit** - Checks for npm vulnerabilities

## Coverage Report

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in a browser to view:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Troubleshooting

**Tests failing locally but passing in CI?**
- Ensure you're using the same Node version as specified in the workflow
- Check environment variables in `.env` file

**Coverage threshold errors?**
- Update coverage thresholds in `jest.config.js` if needed
- Add more tests to improve coverage

**Workflow not triggering?**
- Verify workflow file is in `.github/workflows/` 
- Push to `main` or `develop` branch
- Check GitHub Actions tab for logs

## Next Steps

1. Add unit tests for controllers, models, and routes
2. Add integration tests for API endpoints
3. Add E2E tests if applicable
4. Configure branch protection rules to require passing tests
5. Set up additional checks (linting, type checking, etc.)

## Resources
- [Jest Documentation](https://jestjs.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codecov Documentation](https://docs.codecov.io/)
