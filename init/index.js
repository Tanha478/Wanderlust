const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");


const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
    await Listing.deleteMany({});
    data.data.map((obj) => ({...obj, owner: "652d0081ae547c5d37e56b5f"}));
    await Listing.insertMany(data.data);
    console.log("data was initiallized");
};

initDB();
