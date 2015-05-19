
/*
 * GET home page.
 */
// fs = require('fs');
/*	fs.readFile('./views/index.html', function (err, html) {
    if (err) {
        throw err; 
    } 
	res.status(200).set({"Content-Type": "text/html"});
	res.send(html);
  });*/

exports.index = function(req, res){
	res.render('searchform', { title: 'ANY' });
};