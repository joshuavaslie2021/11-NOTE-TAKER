
var path = require("path")
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;



app.get("/", function(req, res) {
  res.json(path.join(__dirname, "public/index.html"));
});

// Sets up the Heroku app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, function() {
    console.log("App listening on Port " + PORT)
})