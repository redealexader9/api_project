const fs = require('fs').promises;
const fss = require('fs');

const config = require("../../config");
const path1 = require('path');
const { runInNewContext } = require('vm');
const { reset } = require('nodemon');
const { resolveSoa } = require('dns');
const dir = 'files';
let filesContents = fss.readdirSync(dir);
let newurl;
let data = {

   directs: [
    
],
current: 'cloud',
    files: [

    ]
}


function styles(req, res, next){

res.status(303);
res.location('.');
res.sendFile('styles.css', {'root': './static'});
let urltest = req.url;
urltest = urltest.substring(7);
next();
}

async function uploadFile (req, res, next){

    
    try{
    res.location('.');
    await fs.rename(req.file.path, config.projectPath('files', req.file.originalname), error);
    data.files.push(req.file.originalname);
    res.redirect(303, ".");
    }
    catch(err){
    next(err);

    }
        
    
}

async function all(req, res, next){
    
try{
res.location('.');
if(req.url.indexOf('styles.css') != -1 || req.url.indexOf('n.ico') != -1){
    styles(req, res);
    return;
}
else{


let newpath = req.path.replace('/../', '/');
if(newpath != req.path){
   return res.redirect(404, newpath);
}

if('download' in req.query){
    let fileName = req.path;
    let dir = path1.join(__dirname, '../../../');
    
    fileName = fileName.substring(7);
    fileName = 'files\\' + fileName; 
   return res.download(dir + fileName);

}

if(req.url == '/cloud/'){
filesContents = await fs.readdir(dir);
console.log(req.url);

data.files = [];
//res.status(303);
res.type('text/html');
for(let file of filesContents){
    data.files.push(file);
}
data.current = 'cloud';
    return res.render('cloud.hbs', data);

}

if(req.url == '/cloud'){
let newurl = req.originalUrl.replace(/(\?|$)/, '/$1');
return res.redirect(307, newurl);

}

    
let urltest = req.path.substring(1);
console.log(urltest);
if (req.originalUrl.match(/\/(\?|$)/)) {
urltest = urltest.slice(0, -1);
}

let filePath = path1.join(__dirname, '../../../files/' + urltest);
console.log(filePath);
let stats = fs.stat(filePath);





//console.log(filePath);
if(true){     // Directs to a file
//console.log(urltest);
res.status(200);
return res.sendFile(urltest, {'root': './files'});

}
else{
    if (!(req.originalUrl.match(/\/(\?|$)/))) {
    
    let newurl1 = req.originalUrl.replace(/(\?|$)/, '/$1');
    return res.redirect(307, newurl1);
    }

    let curr = req.url.slice(13);
    let dirP = 'files/' + urltest;
    let directory = fss.readdirSync(dirP);
    data.files = [];
    for(let direc of directory){
    data.files.push(direc);
    console.log(direc);
   }
   res.render('home.hbs', data);
}
}
}
catch(err){
    next(err);
}

}

function error(err){
    console.log(err);
}


module.exports = { uploadFile, all, styles };
