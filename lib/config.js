const path2 = require("path");
module.exports = {
cloudDir: path2.join(__dirname, '../files'),

projectPath(...args) { return path2.join(__dirname, '..', ...args) },

hostPort: 8000,

logLevel: 'dev',

sessionOptions: {
    secret: 'bunnyslippers',
    saveUninitialized: false,
    resave: false
}
};
