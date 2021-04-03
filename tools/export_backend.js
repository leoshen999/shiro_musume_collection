var fs = require('fs');
var fse = require('fs-extra');

var src = __dirname + "/../backend";
var dest = __dirname + "/../out/backend";

fs.rmdirSync(dest, {recursive: true});
fs.mkdirSync(dest);

fse.copy(src, dest, function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Export backend successful");
  }
});
