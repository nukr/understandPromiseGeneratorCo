var gulp = require("gulp");
var cp = require("child_process");

gulp.task("default", ["babel-node", "watch"]);

gulp.task("watch", function () {
  gulp.watch("./index.js", ["babel-node"]);
});

gulp.task("babel-node", function () {
  cp.spawn("babel-node", ["-r", "index.js"], {stdio: "inherit"});
});
