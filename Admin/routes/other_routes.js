/*
*
*/

var pagination = require('pagination'),
fs = require('fs'),
search = require('./solr-http-client').search;

function if_defined(s,x)
{ return (x!=undefined?s+x+'&':''); }
function min(a,b)
{ return (a<b?a:b); }

var ui_config= JSON.parse(fs.readFileSync('views/ui.json'));

exports.index = function(route) {
	function sendresponse(route,resultList,paginator,req,res)
	{
		ui_config.search= {
			results: resultList,
			pagination: (paginator==undefined? undefined: paginator.getPaginationData())
		};
		//console.log(resultList);
		res.render('pages/'+route,{ title: 'Admin', request: req.query, args: ui_config });
	}
	switch(route)
	{
		case 'index':
		ui_config.sidebar[0].active=true;
		break;
		case 'dashboard':
		ui_config.sidebar[1].active=true;
		break;
		case 'login':
		break;
		case 'crawler':
		ui_config.sidebar[2].submenus[0].active=true;
		break;
		case 'clustering':
		ui_config.sidebar[2].submenus[2].active=true;
		break;
	};
	return function(req, res)
	{
		var resultList={};
		var args = req.query;
		var paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 1, totalResult: 0});
		if(route =='index' && args != undefined && args.search_term != undefined)
		{
			if(args.rowsPerPage == undefined)
				args.rowsPerPage = 10;
			if(args.current == undefined)
				args.current = 1;
			console.log('index');
			search(args.search_term,args.current,args.rowsPerPage, function(resultList,length)
			{
				//var length = resultList.length;
				/*if((args.current-1)*args.rowsPerPage<resultList.length)
					resultList=resultList.slice((args.current-1)*args.rowsPerPage,min(args.current*args.rowsPerPage,length));
				else
					resultList=[];*/
				var prelink='index?'+if_defined('rowsPerPage=',args.rowsPerPage)+if_defined('search_term=',args.search_term)+'current=';
				paginator = new pagination.SearchPaginator({prelink:prelink, current: args.current, rowsPerPage: args.rowsPerPage, totalResult: length});
				sendresponse(route,resultList,paginator,req,res);
			},
			function()
			{
				res.render('pages/404',{ title: 'Admin', request: req.query, args: ui_config });
			});
		}
		else
		{
			console.log('test');
			sendresponse(route,resultList,paginator,req,res);
		}
	};
};

