
/*
 * GET home page.
 */


exports.index = function(req, res){
	
	
    res.render('index', { title: 'Admin', request: req.query, args: ui_config });
};