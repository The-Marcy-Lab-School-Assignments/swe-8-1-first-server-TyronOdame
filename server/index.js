const express = require('express');

const app = express();

const path = require('path');

const fileName = path.join(__dirname, '../app/dist/');

const serveStatic = express.static(fileName);

// Middleware to log requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};
app.use(logRoutes);
app.use(serveStatic);

const serverJoke = (req, res) => {
  res.json({
    joke: 'Why did the scarecrow win an award?',
    punchline: 'Because he was outstanding in his field!',
  });
};

const serverPicture = (req, res) => {
  res.json({
    url: 'https://imgs.search.brave.com/hTmq8EWenwa4FDjuLCQ8peuMfNUfi_1KlRBDu0PFF_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91bHRp/bWF0ZXN0aWNreS5j/b20vY2RuL3Nob3Av/ZmlsZXMvYXJhYmlj/X2Jsa19zczIzLmpw/Zz92PTE3MzU1MTUz/MTImd2lkdGg9MTQ5/OA',
    alt: 'Supreme BOx logo in Arabic',
  });
};

const serverRollDice = (req, res) => {
  const quantity = parseInt(req.query.quantity, 10) || 1; // Default to 1 if no quantity is provided
  const rolls = [];

  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1); // Generate a random number between 1 and 6
  }

  res.json({ rolls });
};

app.get('/api/rollDie', serverRollDice);
app.get('/api/joke', serverJoke);
app.get('/api/picture', serverPicture);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
