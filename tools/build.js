var fs = require('fs');
var fse = require('fs-extra');
var child_process = require("child_process");
var chalk = require("chalk");
var path = require("path");

var PROJECT_ROOT = path.join(__dirname, "..");

var env_var = Object.assign({}, process.env, {});

process.chdir(PROJECT_ROOT);

console.log(chalk.green("Remove previous artifacts"));

fs.rmdirSync(".next", {recursive: true});
fs.rmdirSync("out", {recursive: true});

console.log(chalk.green("Build frontend"));

child_process.execSync("next build", {
  stdio: "inherit",
  env: env_var,
});

child_process.execSync("next export", {
  stdio: "inherit",
  env: env_var,
});

console.log(chalk.green("Copy backend files"));

fse.copySync("backend", "out/backend");
