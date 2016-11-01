var http = require('http')
var https = require("https");
var fs = require("fs");
var path = require("path");
var qs = require("querystring");
var request = require("request");

var myHttp = function () {
    simpleServerWithTelnetClient();
    httpRequest();
    requestModule();
    httpsServer();
};

function simpleServerWithTelnetClient () {
    var server = http.createServer(function (req, res) {
        if (req.url == "/") {
            //res.setHeader("Set-Cookie", "name=Prakash")
            //res.setHeader("Content-Type", "text/plain")
            res.removeHeader("Content-Length");
            res.removeHeader("Transfer-Encoding");
            res.end("<b>The bold text</b>");
        } else if (req.url == "/form") {
            var data = "";
            req.on("data", function (d) {
                data += d;
            });
            req.on("end", function () {
                var dataObj = qs.parse(data);
                for (var i in dataObj) {
                    console.log(i + " : " + dataObj[i])
                }
            })
        } else {
            res.statusCode = 404;
            res.end("Page Not Found");
        }
    });
    server.listen(3300, function () {
        console.log("listening on port 3300")
    });
}

function httpRequest () {
    var params = qs.stringify({
        "name": "prakash",
        "email": "prakash7m@gmail.com",
        "cat": [1, 2, 3]
    });
    var request = http.request({
        host: "localhost",
        port: 3300,
        path: "/form",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(params)
        }
    }, function (res) {
        res.on("data", function (data) {
            process.stdout.write(data);
        });
        res.on("end", function () {
            console.log("Response ended")
        })
    });
    request.end(params);
}

function requestModule () {
    request({
        uri: "http://localhost:3300/form",
        method: "POST",
        headers: {
            Host: "localhost:8000"
        },
        form: {
            name: "prakash",
            cat: [1, 2, 3],
            nest: {
                one: "hello"
            }
        }
    }, function(error, response, body) {
        console.log(body);
    });
}

function httpsServer () {
    var server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, "../key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "../cert.pem"))
    }, function (req, res) {
        res.end("wooo hoooo, I am on https server");
    });
    server.listen(3400, function () {
        console.log("https server listening at 3400");
    })
}
module.exports = myHttp;