/*
*
*/

var urlencode = require('urlencode');
var request = require('request');

function default_if_undefined_or_empty(variable,default_value)
{
	return (variable==undefined || [variable].reduce(function(a, b) {
    return a.concat(b);
}, [])[0].trim()=='' ? default_value: variable);
}

function array_last(a)
{
	return a[a.length-1];
}

function push2(a,v)
{
	a=(a==undefined?[]:a);
	a.push(v);
	return a;
}


exports.search = function (search_term,start,rows, callback,callback2)
{
	var url='http://127.0.0.1:8983/solr/collection1/select',
	query= '?fl=url%2Cid%2Ccluster%2Clanguage%2Cauthor%2Ctitle%2Ccontent_type&wt=json&start='+start+'&rows='+rows+'&hl=true&hl.fl=content&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E&hl.fragsize=200&q='+urlencode(search_term);
	request.get(url+query, function (error, response, body) {
		console.log('reponse reçue');
		if (!error && response.statusCode == 200)
		{
			var resultList={};
			//console.log(body);
			var resp=JSON.parse(body); // Print the google web page.
			if(resp!= undefined && resp.response != undefined && resp.response.docs != undefined)
			{
				var tmp={};
				resp.response.docs.forEach(function(doc)
				{
					tmp[doc.cluster]=push2(tmp[doc.cluster],doc);
				});
				for(var key in tmp)
				{
					resultList[key]=[];
					tmp[key].forEach(function(doc)
					{
						var title= default_if_undefined_or_empty(doc.title,
							default_if_undefined_or_empty(array_last(doc.url.split('/')),'undefined'));
						resultList[key].push({title: title, cluster: doc.cluster, link:{origin: doc.content_type.join(', '), full: doc.url}, summary: resp.highlighting[doc.id].content[0]});
					});
				}
				console.log('tableau de resultat construit');
				callback(resultList,resp.response.numFound);
			}
			else
			{
				callback2();
			}
		}
		else
			callback2();
	});
}
