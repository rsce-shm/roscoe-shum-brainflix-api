const express = require('express');
const router = express.Router(); 
const fs = require('fs');
const uuid = require('uuid').v4;

function readData(){
    const vidData = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(vidData)
    return parsedData 
}

router.get('/', (_req,res) => {
    const videos = readData();
    const filteredData = videos.map((video) => {
        return {
            id: video.id, 
            title: video.title,
            channel: video.channel,
            image: video.image
        }
    })
    res.json(filteredData)
})

router.get('/:videoId', (req, res)=>{
    const videos = readData();
    const singleVideo = videos.find((video)=> video.id === req.params.videoId);
    res.json(singleVideo)
})

router.post('/', (req, res) =>{

    const today = new Date().valueOf(); 

    const todayDate = new Date(today).toLocaleDateString();

    const newVideo = {
        id: uuid(),
        title: req.body.title, 
        description: req.body.description, 
        channel: 'BigBananaBoy3',
        timestamp: todayDate,
        image: 'http://localhost:8080/images/Upload-video-preview.jpg',
        views: "980,544",
        likes: "22,479",
        duration: "4:01",
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        comments: [
          {
            id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
            name: "Noah Duncan",
            comment: "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
            likes: 0,
            timestamp: todayDate,
          }]
    }

    const videos = readData(); 
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo)
})

router.post("/:videoId/comments", (req, res) => {
    const today = new Date().valueOf(); 

    const todayDate = new Date(today).toLocaleDateString();

    const newComm = {
        id: uuid(),
        name: "BigBananaBoy3",
        comment: req.body.comment,
        likes: 0,
        timestamp: todayDate,
    }

    const videos = readData();
    const selectedVideo = videos.find((video)=> video.id === req.params.videoId)
    const commSection = selectedVideo.comments
    
    commSection.push(newComm)
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos))

    res.status(201).json(newComm)
})

module.exports = router;
