var express = require('express')
var jwt = require('jsonwebtoken');
var bodyParser  =  require("body-parser");
var app = express()
var cors = require('cors')
var http = require('http');
var https = require('https');
const fs = require('fs');
const path = require('path');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var key = fs.readFileSync(__dirname + '/key.pem');
var cert = fs.readFileSync(__dirname + '/cert.pem');
var options = {
  key: key,
  cert: cert
};


var {activatedLists,promisesList,newpromisesList} = require("./models");
let privateKey="SUFNRE9JTkdDT0RJTkdGT1JKRVNVUw==";
var jwt = require('jsonwebtoken');
 
function verifyToken(req, res, next) {
 var token = req.headers['x-access-token'];
   if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, privateKey, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed. to authenticate token.' });
    req.user = decoded;
    next();
  });
}
 
   
app.post('/users',verifyToken, async function (req, res) {

    let users=await activatedLists.find({}, function(err, users) {
        if (err) throw err;
        }).select({"name":1,"username":1,"created_at":1,"_id":0});
  return  res.json(users)
})
app.post('/promises',verifyToken, async function (req, res) {

    let isExists=await promisesList.find({}, function(err, users) {
        if (err) throw err;
        }).select({"_id":0}).sort({"today":1});
  return  res.json(isExists)
})


app.post('/newpromises',verifyToken, async function (req, res) {

let newpromises=await newpromisesList.find({}, function(err, users) {
    if (err) throw err;
    }).select({"_id":0}).sort({"today":1});
return res.json(newpromises)
})

app.post('/addpromise',verifyToken, async function (req, res) {
    let data= req.body.data;
     let a1 = new newpromisesList({
        today: data.edate,
        telugu_promise: data.telugu_promise,
        english_promise: data.english_promise,
        telugu_chapter:data.telugu_chapter,
        english_chapter:data.english_chapter,
        verse:data.verse,
    
  });
  await a1.save();

    let newpromises=await newpromisesList.find({today:data.edate}, function(err, users) {
        if (err) throw err;
        }).select({"_id":0});
   return res.json(newpromises)
 
})


 




app.post('/login', async function (req, res) {
     
      if(req.body.data.username=='satish' && req.body.data.password=="codingforjesus"){
        var token = await  jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: { "id": 25,"name":'yesu' }
        }, privateKey);
     return   res.status(200).send({ isValid:true,token: token });
      }
    return res.status(403).send({isValid:false});

})
app.get('/logout', function(req, res) {
   return res.status(200).send({ auth: false, token: null });
  });




var httpServer = http.createServer(app);
//var httpsServer = https.createServer(options, app);
httpServer.listen(8500);
//httpsServer.listen(8501);
