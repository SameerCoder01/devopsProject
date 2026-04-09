const mongoose = require("mongoose");
const Listing = require("../models/listing");

const mongoURL = "mongodb+srv://sk:YHTU3aSHK0XBKU4e@backend.vjgyz21.mongodb.net/";

main()
.then(()=>console.log("Connection Successful"))
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect(mongoURL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("All listing data cleared. No pre-fed sample data inserted.");
}

initDB();