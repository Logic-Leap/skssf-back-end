const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/dbConnect");
const DataModel = require("./models/Data-model");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 7777;

cloudinary.config({
    cloud_name: 'desvgqarv',
    api_key: '145346287342629',
    api_secret: 'QKV7NMERDvVo5V9IOr1A0sR51yg',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // Set desired format here
        public_id: (req, file) => `${Date.now()}-${file.originalname}` // Unique name generation
    }
});

const multerUpload = multer({ storage: storage });

connectDatabase()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());

app.get("/get-all-data", async(req, res) => {
    try {
        const get_Data = await DataModel.find();
        console.log(get_Data);
        res.status(200).json(get_Data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error fetching data"
        });
    }
});

app.post("/upload-data", multerUpload.single("file"), async(req, res) => {
    try {
        const file = req.file;
        const { username } = req.body;

        if (!file || !username) {
            return res.status(400).json({
                message: "Please provide both username and file"
            });
        }

        const upload_image = await cloudinary.uploader.upload(file.path, {
            folder: "skssf"
        });

        const insert_Database = await DataModel.create({
            username,
            image_url: upload_image.secure_url
        });

        res.status(200).json({
            message: "Successfully Uploaded"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error uploading data"
        });
    }
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "Page Not Found"
    });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
