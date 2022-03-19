const express = require('express');
const maxSize = 2000000001;
const multer = require('multer');
const config = require('../../config');
const fs = require('fs').promises;
const { uploadFile } = require('../cloud/controllers');
const { styles } = require('../cloud/controllers');
const { all } = require('../cloud/controllers');
let size = {
    fileSize: maxSize,
}
const upload = multer({ dest: config.projectPath('data'), limits: size});

const router = express.Router();
const controllers = require('./controllers');


router.post('/*', upload.single("file"), uploadFile);
router.get('/*', all);



module.exports = { router };  
