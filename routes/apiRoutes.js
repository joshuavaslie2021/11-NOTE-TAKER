var path = require("path")
var noteData = require("../db/db.json")
const fs = require("fs")

//export routes to be available to other files
module.exports = function (app) {
    //get route for notes json page
    app.get("/api/notes", function (req, res) {
        return res.json(noteData)
    })
// post route to add note to list
    app.post("/api/notes", function (req, res) {
        var createNewNote = {
            //gives note id as an integer
            id: noteData.length + 1,
            title: req.body.title,
            text: req.body.text
        }
        console.log(createNewNote)
        noteData.push(createNewNote)
        res.json(createNewNote)
    })

    // Delete Route for Notes
    app.delete("/api/notes/:id", function (req, res) {
        // Grabbing the params passed to the function through the :id url
        var entryId = req.params.id
        // Conditional testing if the noteData is at it's final index, if so, empty array.
        if (noteData.length === 1) {
            noteData = [];
            res.json(noteData)
        } else {
            noteData.splice(entryId, 1);
            res.json(noteData)
        }
    })
}