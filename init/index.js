const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("Working");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/MountainNest");
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6720ed15bde049f8db68764d"}));
    await Listing.insertMany(initData.data);
    console.log("Data was Initiallized");
};

initDB();