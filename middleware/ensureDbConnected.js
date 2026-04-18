const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devopsproject";

async function reconnectIfNeeded() {
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    return;
  }

  await mongoose.connect(mongoURL, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
}

async function ensureDbConnected(req, res, next) {
  try {
    await reconnectIfNeeded();
    await mongoose.connection.db.admin().ping();
    return next();
  } catch (err) {
    console.error("Database connectivity check failed:", err);
    return next(new ExpressError(503, "Database is temporarily unavailable. Please try again in a moment."));
  }
}

module.exports = ensureDbConnected;