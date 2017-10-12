var express = require("express");
var router  = express.Router();
var request = require("request");

// Home Page
router.get("/", function(req, res) {
    res.render("search");   
});

// Index - shows search results
router.get("/results", function(req, res) {
    var query = "http://api.yummly.com/v1/api/recipes?_app_id=f8f6ee1c&_app_key=977599dbc45ca25f457f8d2b50645103";
    var url = query + "&q=" + req.query.title;
    
    if(req.query.allowed != null && req.query.allowed != "") {
        url += "&allowedIngredient[]=" + req.query.allowed;
    }
    if(req.query.excluded != null && req.query.excluded != "") {
        url += "&excludedIngredient[]=" + req.query.excluded;
    }
    
    // Request data from Yummly API
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

// Show - details of specific recipe
router.get("/show/:id", function(req, res) {
    var baseUrl = "http://api.yummly.com/v1/api/recipe/",
        recipeId = req.params.id,
        apiKeyAndId = "?_app_id=f8f6ee1c&_app_key=977599dbc45ca25f457f8d2b50645103";
    var url = baseUrl + recipeId + apiKeyAndId;
    
    console.log(url);
    
    // Request data from Yummly
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render("show", {data: data});
        }
    });
});

module.exports = router;