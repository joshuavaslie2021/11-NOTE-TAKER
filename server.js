var PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))





app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})



app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
})


app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) throw err


        let newNote = JSON.parse(data)
        let notelist = req.body
        
        let noteID = newNote.length + 1
        
        let nextNote = { id: noteID, title: notelist.title, text: notelist.text }
        
        newNote.push(nextNote)
       
        res.json(notelist)

        
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(newNote), (err, data) => {
            if (err) throw err
            console.log("Your note has been created!")
        })
    })
})


app.delete("/api/notes/:id", (req, res) => {
    
    fs.readFile("db/db.json", (err, data) => {
        let note = JSON.parse(data)
        let deletedNote = req.body
        note.splice(deletedNote, 1)
        
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(note), (err, data) => {
            if (err) throw err
            console.log("Your note has been deleted!")
        })
        res.json(req.body)
    })
})


app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT)
})