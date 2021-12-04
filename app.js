//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "In this fast-paced world, a person has lot of work bundled upon him, and the person is not able to manage his work and take out time for himself at the same time. Things are always scattered in many places. MySpace provides you a place just for yourself, it is an all-in-one website which can tackle your problems in a user-friendly manner. The list feature will take care of your work planning, the game feature will provide you entertainment, and the daily diary feature will provide you with a place to destress, and capture the memorable and important moments of your life.";

const app = express();

var items=["Complete report","Attend meeting","Buy stationery"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res){

  res.render("home", {homeCont: homeStartingContent, posts: posts});
  // console.log(posts);
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle = req.params.postName;
  const requestedTitleLowerCase = _.lowerCase(requestedTitle);
  posts.forEach(function(post){
    const storedTitle = post.title;
    storedTitleLowerCase = _.lowerCase(storedTitle);
    if(storedTitleLowerCase===requestedTitleLowerCase){
      // console.log("Match found!");
      res.render("post",{postMatched: post});
    }
  });

});



app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  // console.log(req.body.postTitle);
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});



app.get("/list",function(req,res){

  var today = new Date();
  // var currentDay = today.getDay();
  // var day = "";
  //
  // if(currentDay === 6 || currentDay === 0){
  //   day = "weekend";
  // }
  // else{
  //   day = "weekday";
  // }
  // var ftry="Priyasha";

  var options = {weekday:"long", day: "numeric", month: "long"};

  var day = today.toLocaleDateString("en-US",options);

  res.render("list", {kindOfDay: day, newListItems: items});

});
app.post("/list",function(req,res){
  var item = req.body.newListItem;
  items.push(item);
  res.redirect("/list");
});

app.get("/game",function(req,res){
  res.render("game");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
