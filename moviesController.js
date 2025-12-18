const fs = require('fs');
const path = require('path');

const MOVIES_PATH = path.join(__dirname, '../data/movies.json');

const readMovies = () => JSON.parse(fs.readFileSync(MOVIES_PATH, 'utf-8'));
const writeMovies = (data) => fs.writeFileSync(MOVIES_PATH, JSON.stringify(data, null, 2));


const getAllMovies = (req, res) => {
  const movies = readMovies();
  const { genre } = req.query;
  if (genre) {
    return res.json(movies.filter(m => m.genre === genre));
  }
  res.json(movies);
};


const getMovieById = (req, res) => {
  const movies = readMovies();
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};


const createMovie = (req, res) => {
  const movies = readMovies();
  const { title, year, genre } = req.body;
  if (!title || !year || !genre) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newMovie = {
    id: movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1,
    title,
    year: Number(year),
    genre
  };
