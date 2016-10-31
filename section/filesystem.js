var path = require("path");
var fs = require("fs");
var filesystem = function () {
    //Using path module
    console.log("filename: " + __filename);
    console.log("dirname: " + __dirname);
    process.chdir("./section");
    console.log("Current working directory is " + process.cwd())
    console.log("Extention is " + path.extname(__filename))
    console.log("Base name is " + path.basename(__filename, path.extname(__filename)));
    console.log("Dirname is " + path.dirname(__filename))


    //Using fs module
    fs.exists(path.join(__dirname, "../README.md"), function (exists) {
        console.log(exists)
    })

    fs.stat(path.join(__dirname, "../README.md"), function (err, stat) {
        if (err) {
            console.log(err);
        } else {
            console.log(stat);
        }
    });

    fs.stat(path.join(__dirname, "../README.md"), function (err, stat) {
        if (err) {
            console.log(err.message);
        } else {
            fs.open(path.join(__dirname, "../README.md"), "r", function (err, file) {
                if (err) {
                    console.log(err.message);
                } else {
                    var buffer = new Buffer(stat.size);
                    console.log(stat)
                    fs.read(file, buffer, 0, buffer.length, null, function (err, bytesRead, buffer) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            var data = buffer.toString("utf8");
                            console.log(data)
                            fs.close(file, function (err) {
                                if (err) {
                                    console.log(err.message);
                                } else {
                                    console.log("File closed successfully")
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    fs.readFile(path.join(__dirname, "../README.md"), "utf8", function (err, data) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(data);
        }

    })
    
    var content = "My name is prakash paudel";
    fs.writeFile(path.join(__dirname, "../ff.txt"), content, function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("write successful")
        }
    })
    fs.rename(path.join(__dirname, "../f1.txt"), path.join(__dirname, "../f2.txt"), function (err) {
        if (err) {
            console.log("Error renaming " + err.message)
        } else {
            console.log("successfully renamed the file")
        }
    })

    fs.watch(path.join(__dirname, "../ff.txt"), {
        persistent: true,
    }, function (event, filename) {
        console.log("---" + event)
    })

}

module.exports = filesystem;