const express = require('express');
const path = require('path');
const moviesRoutes = require('./routes/movies');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


app.use(express.static(path.join(__dirname, 'public')));


app.use('/movies', moviesRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});


app.listen(PORT, () => {
  console.log(`🎬 Server running on http://localhost:${PORT}`);
});
