import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config';

mongoose.connect(
  config.mongo.uri,
  (err, res) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

const app = express();

app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, OPTIONS, PUT, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(cookieParser());

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  res.status(404);
  next();
});

app.set('port', process.env.PORT || config.app.port);

const server = app.listen(app.get('port'), () => {
  console.log('service RESTful API serer started on: ' + server.address().port);
});
