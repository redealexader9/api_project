const maxSize = 2000000001;
let size = {
    fileSize: maxSize,
}
const express = require('express');

const morgan = require('morgan');
const multer = require('multer');
const config = require('../config');
const cloud = require('./cloud');
const upload = multer({ dest: config.projectPath('data'), limits: size});
const expressSession = require('express-session');
const expressHandlebars = require('express-handlebars');

const sessionFileStore = require('session-file-store');

const { uploadFile } = require('./cloud/controllers');
const { styles } = require('./cloud/controllers');
const { all } = require('./cloud/controllers');
//const { controls } = require('./cloud/controllers');

const app = express();

// Create custom file store class
const FileStore = sessionFileStore(expressSession);

const hbs = expressHandlebars.create({
    defaultLayout: null,
    extname: '.hbs',
});




// Use handlebars for templates with the '.hbs' file extension
app.engine('hbs', expressHandlebars.engine({ defaultLayout: null, extname: '.hbs' }));
//Sets out app to use the handlebars engine

app.set('views', './views');
app.use(express.static(config.projectPath('static')));




// Logging
app.use(morgan('dev'));

// Request bodies

// Sessions
app.use(expressSession({
    ...config.sessionOptions,
    store: new FileStore()
}));

app.get('/cloud/styles.css', styles);
app.use('/cloud', cloud.router);
app.use('*', cloud.router);

app.use((err, req, res, next) => {
console.error(err);
res.status(500);
res.send(err);
});

module.exports = app;
