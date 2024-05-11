const express = require("express")
const cors = require("cors");
const connectDatabase = require("./config/dbConnect");
const app = express()
const multer = require('multer')
const DataModel = require("./models/Data-model");
const imageUpload = require("./middleware/upload ");

const PORT = process.env.PORT || 7777
const cloudinary = require("cloudinary").v2

const storage = multer.memoryStorage()  // store image in memory
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB in bytes
  });


cloudinary.config({
    cloud_name: 'desvgqarv',
    api_key: '145346287342629',
    api_secret: 'QKV7NMERDvVo5V9IOr1A0sR51yg',
  });



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

app.get("/get-all-data",async(req,res)=>{
    try {
        const get_Data = await DataModel.find()
        console.log(get_Data)
        res.status(200).json(get_Data)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Upload issue is there"
        })
    }
})

app.post("/upload-data", imageUpload , async (req, res) => {
    try {
    console.log(req.body.image)

    const image = req.body.image
    const upload = await DataModel.create({
        image_url: image,
        username:req.body.name
    })
    console.log(upload)

    res.status(200).json({
        message:"SuccessFully uploaded"
    })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Upload issue is there"
        });
    }
});



app.get("*",(req,res)=>{
    res.status(402).json({
        message:"Url Is Not Good"
    })
})


app.listen(PORT, () => console.log(`Server is running on PORT`));


