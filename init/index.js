require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devopsproject";

main()
.then(()=>console.log("Connection Successful"))
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect(mongoURL);
}

async function initDB() {
    await Listing.deleteMany({});
    console.log("All listing data cleared. No pre-fed sample data inserted.");
}

initDB();