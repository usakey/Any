/*
* 
*/

var exec = require('child_process').execFile,
request= require('request'),
fs= require('fs'),
child,
running =false,
logs='';
var SolrIP = '10.30.216.178';

function default_if_undefined(variable,default_value)
{
	return (variable==undefined? default_value: variable);
}

exports.run = function(req, resp)
{
	if(running == false)
	{
		var clustNumber= default_if_undefined(req.query.clustNumber,9),
		lang=default_if_undefined(req.query.lang,'en');
		running=true;
		child = exec('python',['../clustering/clusterer.py',''+clustNumber,'--language='+lang],
			function (error, stdout, stderr) {
				running=false;
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				logs+='stdout: ' + stdout+'\n';
				logs+='stderr: ' + stderr+'\n';
				if (error !== null) {
					console.log('exec error: ' + error);
					logs+='exec error: ' + error+'\n';
				}
				fs.createReadStream('../clustering/clusters.properties').pipe(request.put('http://'+SolrIP+':8181/update'));
			});
		logs+='> Process started clustering with '+clustNumber+'clusters (language='+lang+').\n';
		resp.status(200).set('Content-Type', 'text/plain').send('Process started.');
	}
	else
	{
		resp.status(200).set('Content-Type', 'application/json').send({error: 'Process already running!'});
	}
};

exports.stop = function(req, resp)
{
	if(running)
	{
		child.kill('SIGINT');
		logs+='> Process stopped.\n';
		resp.status(200).set('Content-Type', 'text/plain').send('Process stopped.');
	}
	else
	{
		logs+='> error: Process already stopped!\n';
		resp.status(200).set('Content-Type', 'application/json').send({error: 'Process already stopped!'});
	}
}

exports.isRunning = function(req, resp)
{
	resp.status(200).set('Content-Type', 'application/json').send({clustering: running});
}

exports.sendLogs = function(req, resp)
{
	resp.status(200).set('Content-Type', 'text/plain').send(logs);
}

