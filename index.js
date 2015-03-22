const sa = require("superagent");
const fs = require("fs");
const co = require("co");
const Parse = require("koa-parse-restapi");

let moretext = (n, limit) => {
  let url = "http://more.handlino.com/sentences.json";
  if (n && typeof n === "number") url = `${url}?n=${n}`;

  return new Promise(function (resolve, reject) {
    sa.get(url)
    .end(function (err, res) {
      if (err) throw new Error(err);
      if (res.statusCode === 200) {
        resolve(res.text);
      } else {
        reject(res.statusCode);
      }
    });
  });
};

let promiseWriteToFile = (text) => {
  return new Promise(function (resolve, rejected) {
    fs.writeFile("test.txt", text, function (err) {
      if (err) throw new Error("error");
      resolve(text);
    });
  });
};

let promiseReadFromFile = (fileName) => {
  return new Promise(function (resolve, rejected) {
    fs.readFile(fileName, {encoding: "utf8"}, function (err, data) {
      if (err) throw new Error("error");
      resolve(data);
    });
  });
};

let doSomething = function *() {
  let lorem = yield moretext(1);
  yield promiseWriteToFile(lorem);
  let text = yield promiseReadFromFile("./test.txt");
  return text;
};

let onFulfilled = (value) => {
  console.log("we cool!", value);
};

let onRejected = (reason) => {
  console.log("not cool", reason);
};

let catchErr = (err) => {
  if (err) throw new Error("error");

  console.log("fatal error");
};
/*
co(doSomething)
  .then(onFulfilled, onRejected)
  .catch(catchErr);

let p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});

let p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2])
.then(function (val) {
  console.log("who win ? =>", val);
});
*/

let meepbee = new Parse("DHPbawPXsk9VM697XtD0UNuYAuaxuxc8tEXoIquY", "RtmDHDn6h1ehzn9sclbyky5IeWa6Sw5aOJTVKYTt");
let arr = new Array(900);
arr.fill(1);
arr = arr.map(async function () {
  let products = await meepbee.getObjects("Products");
  let rnd = Math.floor(Math.random() * products.body.results.length);
  return meepbee.getObject("Products", products.body.results[rnd].objectId);
});

async function fetchSomething() {
  let t1 = new Date();
  await Promise.all(arr).then(function (value) {
    let i = 0;
    value.forEach(function (v) {
      console.log(v.body.title, v.status, ++i);
    });
  }, function (reason) {
    console.log("reject=>", reason.dump.response.body);
  }).catch(function (e) {
    console.log("@@@catch=>", e);
  });
  let t2 = new Date();
  console.log(t2 - t1);
}

fetchSomething();

