
/*
 * GET search result.
 */

exports.process = function(req, res){
	var obj = {};
	//console.log('body: ' + JSON.stringify(req.body));
	res.render('searchresult', { title: 'ANY', request: req.body });
};