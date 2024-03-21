const cors = require("cors")
const express = require("express");
const app = express();
const PORT = 8080;
const videosRoute = require("./routes/videos.js")

app.use(cors())

app.use(express.json());

app.use(express.static("public"))

//http://localhost:8080/images/Upload-video-preview.jpg

app.use((req, res, next)=>{
    console.log("Logging a request from middleware");
    next(); 
})

app.use("/videos", videosRoute);

app.listen(PORT, () => {
    console.log(`Server listening on` + PORT)
})

