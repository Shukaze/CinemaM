const mongoose = require('mongoose');
const Movie = require('../models/movie');
const multer = require('multer');
const fs = require('fs');

exports.createMovie = (req, res) => {
  const body = req.body

  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a movie',
      })
  }

  const movie = new Movie(body)

  if (!movie) {
      return res.status(400).json({ success: false, error: err })
  }

  movie
      .save()
      .then(() => {
          return res.status(201).json({
              success: true,
              id: movie._id,
              message: 'Movie created!',
          })
      })
      .catch(error => {
          return res.status(400).json({
              error,
              message: 'Movie not created!',
          })
      })
}
exports.getMovies = async (req, res) => {
  await Movie.find({}, (err, movies) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!movies.length) {
          return res
              .status(404)
              .json({ success: false, error: `Movie not found` })
      }
      return res.status(200).json({ success: true, data: movies })
  }).catch(err => console.log(err))
}

exports.getAllMovies = (req, res, next) => {
  Movie.find()
  .then(movies => res.status(200).json({
      count: movies.length,
      movies: movies
    }
  ))
  .catch(err => res.status(500).json({ error: err }) ); 
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) =>  {
    callback(null, Date.now() + "-" + file.originalname)
  }
});
const upload = multer({ storage: storage }).single('image');

exports.addMovie = (req, res, next) => {
  upload(req, res, (err) => {
    if(err) res.status(500).json(err)
    else {
      // console.log(req.file)
      fs.readFile(req.file.path, function(err, data) {
        if (err) throw err;
        else {
          const contentType = req.file.mimetype;
          const newMovie = new Movie({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            genre: req.body.genre,
            image: {data, contentType},
            rate: req.body.rate, 
            trailerLink: req.body.trailerLink,
            movieLength: req.body.movieLength,
            description: req.body.description
          }) 
  
          //Saving new movie in db
          newMovie.save((err, movie) => 
          {
            if(err) res.status(500).json({ error: err });
            else{
              res.status(201).json({ 
                message: "A new movie added.",
                movie: movie
              });
            }
          })
          // Encode to base64
          // let encodedImage = new Buffer(data, 'binary').toString('base64');
          // Decode from base64
          // let decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
        }
      });
      // const data = fs.readFileSync(req.file.path)
    } 
  })
}