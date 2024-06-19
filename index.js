const connectDB = require('./server');
const express = require('express');
const bodyParser = require('body-parser');
const cacheNoStore = require('./middlewares/cacheNoStore');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const ratingsRouter = require('./routes/ratings');
const gamesMovesRouter = require('./routes/gamesMoves');


const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

//app.use(cacheNoStore);

app.use('/api', usersRouter);
app.use('/api', gamesRouter);
app.use('/api', gamesMovesRouter);
app.use('/api', ratingsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
