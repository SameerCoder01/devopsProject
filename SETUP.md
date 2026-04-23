# Project Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB or MongoDB Atlas account
- npm (comes with Node.js)

## Installation Options

### Option 1: Using MongoDB Atlas (Recommended for Development)

1. **Create MongoDB Atlas Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create Database"
   - Choose "M0 Sandbox" (free tier)
   - Select a region close to you
   - Wait for cluster to be created (5-10 minutes)

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Choose Node.js driver
   - Copy the connection string

4. **Update .env File**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/devopsproject
   PORT=8080
   SESSION_SECRET=your-strong-session-secret
   IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=change-me
   ```

5. **Install Dependencies and Run**
   ```bash
   npm install
   npm start
   ```

### Option 2: Using Docker and Docker Compose (Recommended for Local Development)

**Prerequisites:** Docker Desktop must be installed and running

1. **Start Services**
   ```bash
   docker-compose up -d
   ```

2. **View Logs**
   ```bash
   docker-compose logs -f app
   ```

3. **Stop Services**
   ```bash
   docker-compose down
   ```

### Option 3: Manual MongoDB Installation (Windows)

1. **Download MongoDB Community Edition**
   - Visit https://www.mongodb.com/try/download/community
   - Select Windows
   - Download the MSI installer
   - Run the installer

2. **Verify Installation**
   ```bash
   mongod --version
   ```

3. **Start MongoDB Service**
   ```bash
   # Open PowerShell as Administrator
   mongod
   ```

4. **In Another Terminal, Run the Application**
   ```bash
   npm install
   npm start
   ```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests in CI mode (for GitHub Actions)
npm run test:ci
```

## Quick Start (Fastest Method)

If you have Docker Desktop installed and running:

```bash
# Terminal 1 - Start MongoDB and App
docker-compose up

# Terminal 2 (optional) - View logs
docker-compose logs -f app
```

If you prefer MongoDB Atlas:

```bash
# 1. Get your MongoDB Atlas connection string
# 2. Update .env with MONGO_URL
# 3. Run:
npm install
npm start
```

## Troubleshooting

### MongoDB Connection Error: ECONNREFUSED 127.0.0.1:27017

**Solution:** MongoDB is not running. Use one of the setup options above.

### Docker Error: "Cannot connect to Docker daemon"

**Solution:** 
- Make sure Docker Desktop is running
- On Windows, check Docker Desktop is in the System Tray
- Restart Docker Desktop if needed

### Tests Fail with Database Errors

**Solution:**
- Tests should not require database connection
- Check that all test files are in the `tests/` directory
- Run: `npm test -- --detectOpenHandles`

## Environment Variables

Create a `.env` file in the project root with:

```env
PORT=8080                                    # Server port
MONGO_URL=mongodb://...                      # MongoDB connection string
SESSION_SECRET=your-secret-key               # Session secret (should be strong)
IMAGEKIT_PRIVATE_KEY=your-key                # ImageKit API key
ADMIN_USERNAME=admin                         # Admin username for initialization
ADMIN_EMAIL=admin@example.com                # Admin email
ADMIN_PASSWORD=your-password                 # Admin password
```

## Available Scripts

```bash
npm start              # Start the application
npm test               # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:ci       # Run tests for CI/CD
npm run seed:admin    # Seed admin user in database
npm run sonar:scan    # Run SonarQube analysis
```

## Next Steps

1. Set up MongoDB using one of the options above
2. Copy `.env.example` to `.env` and update values
3. Run `npm install`
4. Run `npm start`
5. Open http://localhost:8080 in your browser

## Support

For more information, check:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Project CI/CD Setup](./CI_CD_SETUP.md)
