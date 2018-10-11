import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import methodOverride from 'method-override';
import morgan from 'morgan';
import log from 'fancy-log';
import 'dotenv/config';
import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

// Initializing all project dependencies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// app.use(express.static(path.join(__dirname, '/public')));

// Logs the http request in the console;
if (!isProduction) {
  app.use(errorhandler());
  app.use(morgan('dev'));
}

app.use('/', (req, res) => {
  res.status(200).json({
    message: ['Welcome'],
  });
});
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('This route is not available');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        status: err.status,
        message: err.message,
      },
    });
    next();
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
  next();
});

// starts the http server...
const server = app.listen(process.env.PORT || 3000, () => {
  log(`Listening on port ${server.address().port}`);
});

export default app;
