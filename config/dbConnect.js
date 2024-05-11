const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://bsidin79:PILRwZSE1D1laEX1@skssf.mp95uza.mongodb.net/?retryWrites=true&w=majority&appName=skssf"

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true 
        });
        console.log("Server is connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to MongoDB: error`);
    }
}

module.exports = connectDatabase;

