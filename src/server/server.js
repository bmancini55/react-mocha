
let path = require('path');
let express = require('express');
let servestatic = require('serve-static');

let app = express();

app.use('/public', servestatic(path.join(__dirname, '../client')));

app.set('view engine', 'jade');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.render('index.jade');
});


app.listen(8000, () => {
  console.log('Listening on port 8000');
});