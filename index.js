const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3002;
const app = express();

const model = require('./api/model.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//endpoint to get user based off of username
app.get("/getUsers", (req, res) => {
  console.log(req.query.username)
  model.User.find({user: req.query.username}).then(function(list){
    if(list.length > 0){
      console.log(list)
      res.send(list);
    }else{
      console.log("ERROR! no results on that data");
      res.send([]);
    }
  });
})

//endpoint to get all hihghscores
app.get("/getScores", (req, res) => {
  model.Highscore.find({}).then(function(list){
    if(list.length > 0){
      console.log(list)
      res.send(list);
    }else{
      console.log("ERROR! no results on that data")
    }
  });
})

//endpoint to get all highscores based off of username
app.get("/getHighScores", (req, res) => {
  console.log(req.query.username + "hi")
  model.Highscore.find({user: req.query.username}).then(function(list){
    if(list.length > 0){
      res.send(list);
    }else{
      console.log("ERROR! no results on that data")
    }
  });
})


//endpoint to get highscores based off of difficulty
app.get("/getDifficultyHighScores", (req, res) => {
  console.log(`Attempting to get ${req.query.difficulty} level scores`);
  model.Highscore.find({level: `${req.query.difficulty}`}).then(function(list){
    if(list.length > 0){
      res.send(list);
    }else{
      console.log("ERROR! no results on that data")
      res.send([]);
    }
  });
})

//endpoint to insert highscores
app.post("/insertHighscore", (req, res) => {
  model.Highscore.create({user: req.body.userName, score: req.body.score, level: req.body.level, time: req.body.time}, function(err){
    if (err) {
      throw err;
    }else{
      console.log("inserted successfully");
      res.send(JSON.stringify({userName: req.body.userName}));

    }
  });
})

//end point to insert a new user
app.post("/registerUser", (req, res) => {
  model.User.create({user: req.body.userName, email: req.body.email, password: req.body.passwd}, function(err){
    if (err) {
      throw err;
    }else{
      console.log("inserted successfully");
      res.send(JSON.stringify({userName: req.body.userName}));
    }
  });
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;