require('dotenv').config();
const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");


const Mongo_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
    try {
    await Listing.deleteMany({});
    data.data.map((obj) => ({...obj, owner: "67dfae6f51f00cf22047802e"}));
    await Listing.insertMany(data.data);
    console.log("data was initiallized");
    }
    catch(err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
};

initDB();
