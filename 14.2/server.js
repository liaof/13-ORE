const path = require('path');// for stylesheet
const express = require('express');
const session = require('express-session');// to use express-session and sequelize store
const exphbs = require('express-handlebars');// for Handlebars.js


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);// to use express-session and sequelize store

const sess = {// to use express-session and sequelize store
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);// for Handlebars.js
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));// for stylesheet

app.use(require('./controllers/'));

// turn on connection to db and server
// 'sync' means Sequelize is taking the models and conecting them to associated database tables. if there is no table it'll craete one
// if force:true, we will make the tables re-create if ther are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
