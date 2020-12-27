var path = require("path")

module.exports = function(app) {
    //get route for url /notes
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })
    //get route for nothing or wrong url
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
}