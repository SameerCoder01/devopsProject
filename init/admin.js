require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devopsproject";

async function main() {
    await mongoose.connect(mongoURL);
}

async function seedAdmin() {
    const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error("Set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env before running the admin bootstrap script.");
    }

    const existingAdmin = await User.findOne({
        $or: [{ username: ADMIN_USERNAME }, { email: ADMIN_EMAIL }],
    });

    if (existingAdmin) {
        existingAdmin.role = "admin";
        await existingAdmin.setPassword(ADMIN_PASSWORD);
        await existingAdmin.save();
        console.log(`Admin account updated for ${existingAdmin.username}`);
        return;
    }

    const adminUser = new User({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        role: "admin",
    });

    await User.register(adminUser, ADMIN_PASSWORD);
    console.log(`Admin account created for ${ADMIN_USERNAME}`);
}

main()
    .then(seedAdmin)
    .then(() => mongoose.connection.close())
    .then(() => console.log("Admin bootstrap completed."))
    .catch(async (error) => {
        console.error(error.message);
        await mongoose.connection.close().catch(() => {});
        process.exit(1);
    });