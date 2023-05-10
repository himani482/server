
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var postRoutes = require('./routes/posts.js')
const path = require('path');
const Models = require(path.resolve('models','index.js'));

app.use(bodyParser.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT|| 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
