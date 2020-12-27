var PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const fs = require("fs");
const favicon = require('express-favicon')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//connect server with routes files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);





app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
  });

  const server = app.listen(2000, function(){
    console.log('server is running at %s .', server.address().port);
});