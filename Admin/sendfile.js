var fs= require('fs'),
request= require('request');

/*
var options = {
    url: 'http://10.30.216.178:8181/update',
    method: 'PUT',
    headers: {
        'User-Agent': 'request'
    },
    body: 'test'
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.stargazers_count + " Stars");
        console.log(info.forks_count + " Forks");
    }
}

request(options, callback);

*/
fs.createReadStream('./TODO').pipe(request.put('http://10.30.216.178:8181/update'));