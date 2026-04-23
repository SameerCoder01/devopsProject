# Quick Start Guide - MongoDB Atlas

## Option A: Use MongoDB Atlas (Recommended - Easiest Setup)

### Step 1: Create Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Sign up with email/Google

### Step 2: Create a Cluster
1. Create organization & project
2. Click "Create a Deployment"
3. Select "M0 Sandbox" (FREE tier)
4. Choose your region
5. Click "Create Deployment"
6. Wait 5-10 minutes for cluster to be ready

### Step 3: Get Connection String
1. Click "Drivers" or "Connect" button
2. Select "Node.js" driver
3. Click "Copy" connection string
4. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devopsproject`

### Step 4: Update .env
Replace the MONGO_URL line in `.env`:
```
MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devopsproject
```

### Step 5: Start the App
```bash
npm start
```

Visit http://localhost:8080


## Option B: Install MongoDB Locally (Windows)

### Download & Install
1. Go to https://www.mongodb.com/try/download/community
2. Download Windows MSI Installer
3. Run installer and follow steps
4. Install as Windows Service (checked by default)

### Verify Installation
```powershell
# Open PowerShell as Administrator
mongod --version
```

### Start MongoDB
```powershell
# MongoDB should auto-start, or:
net start MongoDB
```

### Run the App
```bash
npm start
```


## Option C: Using Docker (If Docker Desktop is Running Properly)

```bash
# Make sure Docker Desktop is running
docker-compose up --build
```


## Troubleshooting

**Error: "connect ECONNREFUSED 127.0.0.1:27017"**
- MongoDB is not running
- Use MongoDB Atlas (Option A) OR install locally (Option B)

**Connection timeout on MongoDB Atlas**
- Check username/password in connection string
- Make sure IP address is whitelisted in MongoDB Atlas security settings
- Add your current IP: https://cloud.mongodb.com/ → Network Access → Add IP

**App not responding at http://localhost:8080**
- Check terminal for error messages
- Make sure PORT=8080 in .env
- Kill any process on port 8080: `netstat -ano | findstr :8080`

---

**Recommended: Use Option A (MongoDB Atlas) - No local setup needed!**
