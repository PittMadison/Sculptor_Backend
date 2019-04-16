const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const router = require('./routes/routes');

mongoose.connect('mongodb+srv://admin:admin@sculptorcluster-atl1y.mongodb.net/users?retryWrites=true', {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(
  () => console.log('DB OK'),
  err => console.log('ERROR'),
);
const app = express();

app.use(logger('tiny'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors());

app.use('/', express.static('public'));

app.use('/api', router);

app.listen(3000, () => console.log('server is on 3000'));