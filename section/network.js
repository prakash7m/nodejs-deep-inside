var net = require("net")
var dgram = require("dgram");
var dns = require("dns");
var network = function () {
    netServer();
    netServerClient();
    udpServer();
    udpClient();
    dnsTest();
    validateIP();
}

function netServer() {
    var server = net.createServer(function (socket) {
        socket.end("hello and goodbye");
        
    })
    server.listen(3100);
    server.unref();
}

function netServerClient() {
    var client = net.connect(3100, "localhost", function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log("connection established")
        }
    })
    client.on("data", function(data) {
        process.stdout.write(data);
    });
}

function udpServer() {
     var socket = dgram.createSocket("udp4", function (msg, rinfo) {
         console.log('receviced data');
         console.log(rinfo)
         console.log(msg.toString())
     })
     socket.bind(3200, function () {
         console.log("listening to port 3200");
     });
}

function udpClient() {
    var client = dgram.createSocket("udp4");
    var message = new Buffer("Testing UDP");
    client.send(message, 0, message.length, 3200, "localhost", function (error, bytes) {
        console.log("successfully sent bytes " + bytes)
        client.close();
    })
}

function dnsTest() {
    var domain = "google.com";
    dns.lookup(domain, 4, function (err, address, family) {
        console.log("\n Address of " + domain)
        console.log(address, family)
    });
    dns.resolve(domain, function (err, address, family) {
        console.log("\n Address of " + domain)
        console.log(address, family)
    })
    dns.reverse("172.217.26.174", function (err, domains) {
        console.log('Reverse lookup of ip is ' + domains);
    })
}

function validateIP() {
    var ip1 = "127.0.0.1"
    var ip2 = "fe80::1610:9fff:fee4:d63d"
    var ip3 = "testing"

    function classify(input) {
        console.log("isIP('" + input + "') = " + net.isIP(input));
        console.log("isIPv4('" + input + "') = " + net.isIPv4(input));
        console.log("isIPv6('" + input + "') = " + net.isIPv6(input));
        console.log();
    }

    classify(ip1);
    classify(ip2);
    classify(ip3);
}
module.exports = network;