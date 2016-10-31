var Stream = require("stream");
var fs = require("fs");
var path = require("path");
var zlib = require("zlib")
var st = function () {
    writableStream();
    fileStream();
    compression();
}

function writableStream() {
    var stream = new Stream();
    var bytes = 0;

    stream.writable = true;

    stream.write = function(buffer) {
        bytes += buffer.length;
    };

    stream.end = function(buffer) {
        if (buffer) {
            stream.write(buffer);
        }

        stream.writable = false;
        stream.emit("finish");
        console.log(bytes + " bytes written");
    };

    stream.pipe(stream)
    stream.emit("data", new Buffer("hello"));
    stream.emit("end")
}

function fileStream() {
    var stream = fs.createReadStream(path.join(__dirname, "../largefile.txt"));
    stream.on("data", function (data) {
        process.stdout.write(data.toString());
    });
    stream.on("end", function () {
        console.log("\nEnding stream")
    })
}

function compression () {
    var gzip = zlib.createGzip();
    var input = fs.createReadStream(path.join(__dirname, "../largefile.txt"));
    var output = fs.createWriteStream(path.join(__dirname, "../largefile.txt.gz"));

    input.pipe(gzip).pipe(output);
}
module.exports = st;
