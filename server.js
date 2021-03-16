var PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);




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

        
        let createNewNote = JSON.parse(data)
        let notes = req.body
        
        let noteID = notes.length + 1
        
        let addNote = { id: noteID, title: notes.title, text: notes.text }
        
        createNewNote.push(addNote)
        // response
        res.json(notes)

        
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(createNewNote), (err, data) => {
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


app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
  });

