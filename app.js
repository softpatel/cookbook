var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require('body-parser');
    
// require routes
var recipeRoutes = require("./routes/recipes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use("/", recipeRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Meal Server Has Started!");
});