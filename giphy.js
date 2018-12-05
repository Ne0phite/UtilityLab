
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let arr = []
app.get('/gif/', (req, res) => {
  let searchTerm = req.query['search'].toLowerCase();
  axios
  .get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=enZ0mdMC4C2UKJhXALKsmk8UMF5W05NJ`)
    .then(response => {
        let responseArr = response.data.data;
        responseArr.forEach(el => {
          arr.push(el.images.original.url)
        });
        if(arr.length){
          res.json(arr);
        } else {
          res.send("Sorry, No Matches For Your Query Found :(")
        }
      })
      .catch(error => {
          res.send(error);
      });
})

app.get('/*', (req, res) => {
  res.send("Please use the following path to find your gifs: http://localhost:3000/gif/?search=[YOUR SEARCH TERM]")
})
app.listen(3000, () => {
  console.log("You are listening to port 3000");
})

//http://api.giphy.com/v1/gifs/search?q=soap&api_key=enZ0mdMC4C2UKJhXALKsmk8UMF5W05NJ
