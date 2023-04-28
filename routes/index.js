var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var apiKey = process.env.OWM_API_KEY;

router.get("/movies", (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      res.json({ movies: data.results });
    });
});

router.get("/genre", (req, res) => {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
  .then((response) => response.json())
  .then(data => {
    res.json({genres: data.genres})
  })
})

router.post("/byCat", (req, res) => {
  console.log('reqBack:', req)
  fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${req.body.genreId}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    res.json({movies: data.results})
    console.log(data.results)
  })
})
module.exports = router;
