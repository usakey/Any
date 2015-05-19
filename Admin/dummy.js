/*
* Simule le fonctionnement de Solr
*/

var express = require('express'),
http = require('http');

var test = function(req, res, next) {
	console.log('requete reçue');
	next();
}

var app = express();
app.configure(function(){
	app.set('port', 8983);
	app.use(test);
	app.use(app.router);
});

var tmp2 = {
  "responseHeader":{
    "status":0,
    "QTime":13,
    "params":{
      "hl.fragsize":"200",
      "fl":"url,cluster,language,author,title,content_type",
      "indent":"true",
      "q":"ensta",
      "hl.simple.pre":"<em>",
      "hl.simple.post":"</em>",
      "hl.fl":"content",
      "wt":"json",
      "hl":"true"}},
  "response":{
      "numFound":1,
      "start":0,
      "docs":[
          {
            "url":"www.helloworld.com",
            "cluster":"1",
            "language":"en",
            "id": "abcdefg12345",
            "author":"tanchou",
            "title":["Microsoft Word - regsco CI 2013-2014doc.doc"],
            "content_type":["application/pdf"]
            }]
  },
  "highlighting":{
    "abcdefg12345":{
      "content":[" kk"]}}};

var tmp =tmp2.response.docs;
tmp2.response.docs= tmp.concat(tmp.concat(tmp.concat(tmp)));

function dummy(req,resp)
{
	console.log('OK');
	resp.status(200).send(JSON.stringify(tmp2 ));
};

app.get('/solr/collection1/select',dummy);
app.post('/solr/collection1/select',dummy);


http.createServer(app).listen(app.get('port'),'127.0.0.1', function(){
	console.log("Express server[127.0.0.1] listening on port " + app.get('port'));
});
