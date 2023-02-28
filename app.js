require('dotenv').config();

const express = require ('express');
const logger = require('morgan');
const createError = require("http-errors");

require('./config/db.config');

const app = express ();

require('./config/hbs.config');
const { session, loadSessionUser } = require("./config/session.config");

app.set('view engine','hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));
app.use(logger('dev'));

app.use(session);
app.use(loadSessionUser);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

const routes = require('./config/routes.config');
app.use('/', routes);

app.use((req, res, next) => {
  next(createError(404, 'Page not found'))
})

app.use((error, req, res, next) => {
  error = !error.status ? createError(500, error) : error;
  console.error(error);

  res.status(error.status)
    .render(`errors/${error.status}`, { error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`App listening at port ${port}`))