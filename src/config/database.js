const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://DevtaNode:4C4XX6Ij3VXcocbA@devtanode.dkrgjqh.mongodb.net/devTinder"
    )
};

module.exports = connectDB;
