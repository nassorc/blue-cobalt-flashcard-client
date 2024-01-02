const fs = require("fs");
const path = require("path");

let dirPath = path.join(__dirname, "..", "src");

run(dirPath);

// Convert js and jsx files to ts and tsx files
function run(path) {
  let files = fs.readdirSync(path);
  for (file of files) {
    let info = fs.lstatSync(path + "/" + file);
    if (info.isFile()) {
      let [name, ext] = file.split(".");
      if (ext.toUpperCase() === "JS") {
        fs.renameSync(path + "/" + file, path + "/" + name + "." + "ts");
      } else if (ext.toUpperCase() === "JSX") {
        fs.renameSync(path + "/" + file, path + "/" + name + "." + "tsx");
      }
    }
    if (info.isDirectory()) {
      run(path + "/" + file);
    }
  }
}
