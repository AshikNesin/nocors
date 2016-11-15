#!/usr/bin/env node

'use strict';
var express = require('express');
var request = require('request');
var morgan = require('morgan')
var args = require('yargs').argv;
var app = express();

const helpText = `
	Usage
	  $ nocors

	Options
	  --port  Port you want to run the proxy server
	  --endpoint API endpoint root URL

	Examples
	  $ nocors --port=1234 --endpoint=http://api.hugethoughts.com
`;

if (args.endpoint === undefined || args.port === undefined || args.help) {
    console.log(helpText);
    return;

}
app.use(morgan('combined'))
app.use('/', function(req, res) {

    var API_END_POINT = args.endpoint + req.url;
    var config = {
        url: args.endpoint + req.url,
        headers: req.headers
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    req.pipe(request(config)).pipe(res);
});

app.listen(args.port);
console.log('NO_CORS Proxy is running on port ' + args.port);
