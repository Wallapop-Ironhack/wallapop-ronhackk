require('dotenv').config();

const express = require ('express');
const logger = require('morgan');

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
app.use('/', routes)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send("Ops, ha sucedido un error");
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`App listening at port ${port}`))