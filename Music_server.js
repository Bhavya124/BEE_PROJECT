const express = require("express");
const app = express();
const port = 3002;


app.use(express.json());

app.get("/about", (req, res) => {
    res.send("Welcome to the Music Player.");
});


const musicList = [];
let nextId = 1;


app.post("/add_music", (req, res) => {
    const new_music = {
        id: nextId++,
        music_title: req.body.music_title,
        music_author: req.body.music_author,
        genre: req.body.genre
    };

    res.status(200).json({ message: "Music track successfully added!"});
    musicList.push(new_music);
});

app.get("/music_list", (req, res) => {
    res.status(200).json(musicList);
});


app.put("/update_music/:id", (req, res) => {
    const music_id = Number(req.params.id);

    for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].id === music_id) {
            musicList[i].music_title = req.body.music_title ;
            musicList[i].music_author = req.body.music_author ;
            musicList[i].genre = req.body.genre ;

            console.log(musicList);
            return res.status(200).json({ message: "Music track updated!"});
        }
    }

    res.status(404).json({ message: "Music track not found." });
});

app.delete("/delete_music/:id", (req, res) => {
    const music_id = Number(req.params.id);

    const index = musicList.findIndex((track) => track.id === music_id);
    if (index !== -1) {
        musicList.splice(index, 1);
        console.log(musicList);
        return res.status(200).json({ message: " Music track successfully deleted." });
    }

    res.status(404).json({ message: "Music track not found." });
});

app.listen(port, () => {
    console.log(` Music Player API running on http://localhost:${port}`);
});
