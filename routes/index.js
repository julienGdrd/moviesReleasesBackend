var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var apiKey = process.env.OWM_API_KEY;

router.get("/movies", (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      res.json({ movies: data.results });
    });
});

router.get("/upcoming", (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
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
  fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${req.body.genreId}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    res.json({movies: data.results})
  })
})

router.post("/search", (req, res) => {
  console.log('req.body :', req.body.searchQuery)
  fetch(`https://api.themoviedb.org/3/search/movie?query=${req.body.searchQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const moviesWithPoster = data.results.filter(movie => movie.poster_path !== null)
    res.json({movies: moviesWithPoster})
    console.log(data)
  })
})


module.exports = router;
