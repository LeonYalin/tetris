const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/api/highScores', function (req, res) {
  res.status(200).json({ code: 0, entities: getScores() });
});

app.post('/api/highScores', function (req, res) {
  const { score, reset } = req.body;
  const nextScores = addScore(score, reset);
  res.status(200).json({ code: 0, entities: nextScores });
});

const DEFAULT_SCORES = [
  { name: 'Leon Yalin', score: 9999, lines: 9999, level: 9999, date: 1630585684000 },
  { name: 'Joker', score: 3500, lines: 50, level: 9, date: 1630502884000 },
  { name: 'Batman', score: 2500, lines: 40, level: 7, date: 1627910884000 },
  { name: 'Superman', score: 1500, lines: 30, level: 5, date: 1599053284000 },
  { name: 'Aquaman', score: 1000, lines: 20, level: 3, date: 1314970084000 },
];

function getScores() {
  const hs = JSON.parse(fs.readFileSync('./highScores.json', 'utf8'));
  return hs && hs.length ? hs : DEFAULT_SCORES;
}

function addScore(score, reset) {
  const hs = JSON.parse(fs.readFileSync('./highScores.json', 'utf8'));
  const scores = hs && hs.length ? hs : DEFAULT_SCORES;
  const nextScores = reset ? DEFAULT_SCORES : [...scores, score].sort((a, b) => b.score - a.score);

  try {
    fs.writeFileSync('./highScores.json', JSON.stringify(nextScores));
  } catch (err) {
    console.log('write error: ' + err);
  }
  return nextScores;
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
