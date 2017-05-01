const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const routes = require('./routes');
const port = 8080
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');

models.db.sync({force: true})  // {force: true}  == drops tables and recreates them.
.then(function () {
  var server = app.listen(port);
  console.log('Listening on  ' + port);
})
.catch(console.error);

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off


app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/', routes);
