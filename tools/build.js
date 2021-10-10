var fs = require("fs");
var fse = require("fs-extra");
var child_process = require("child_process");
var chalk = require("chalk");
var path = require("path");

var PROJECT_ROOT = path.join(__dirname, "..");

var env_var = Object.assign({}, process.env, {});

process.chdir(PROJECT_ROOT);

console.log(chalk.green("Remove previous artifacts"));

fs.rmdirSync(".next", { recursive: true });
fs.rmdirSync("out", { recursive: true });

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

console.log(chalk.green("Update cache info for service worker"));

var app_src_files = ["", "favicon.ico"];

function addFilesToSrc(dir) {
  var dirents = fs.readdirSync("out/" + dir, { withFileTypes: true });
  dirents.forEach((dirent) => {
    if (dirent.isDirectory()) addFilesToSrc(dir + "/" + dirent.name);
    else if (dirent.isFile()) {
      app_src_files.push(dir + "/" + dirent.name);
    }
  });
}
addFilesToSrc("_next");
addFilesToSrc("weapon_images");

var app_src_timestamp_str =
  '"' + new Date().toISOString().replace(/[T:.Z-]/g, "") + '"';
var app_src_file_list_str =
  "[" +
  app_src_files
    .map((f) => '"' + process.env.NEXT_PUBLIC_FRONTEND_BASE + f + '"')
    .join(",") +
  "]";
var dynamic_res_dir_str =
  '"' + process.env.NEXT_PUBLIC_FRONTEND_BASE + 'musume_images/"';

var sw = fs.readFileSync("out/sw.js", "utf8");
sw = sw
  .replace(/XXX_APP_SRC_TIMESTAMP_XXX/g, app_src_timestamp_str)
  .replace(/XXX_APP_SRC_FILE_LIST_XXX/g, app_src_file_list_str)
  .replace(/XXX_DYNAMIC_RES_DIR_XXX/g, dynamic_res_dir_str);

fs.writeFileSync("out/sw.js", sw, "utf8");
