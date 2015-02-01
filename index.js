const sa = require('superagent');
const fs = require('fs');
const co = require('co');

let moretext = (n, limit) => {
  let url = 'http://more.handlino.com/sentences.json';
  if (n && typeof n === 'number') url = `${url}?n=${n}`;

  return new Promise(function (resolve, reject) {
    sa.get(url)
    .end(function (err, res) {
      if (res.statusCode === 200) {
        resolve(res.text)
      } else {
        reject(res.statusCode);
      }
    })
  });
};

let promiseWriteToFile = (text) => {
  return new Promise(function (resolve, rejected) {
    fs.writeFile('test.txt', text, function (err) {
      if (err) throw Error('error');
      resolve(text)
    });
  })
};

let promiseReadFromFile = (fileName) => {
  return new Promise(function (resolve, rejected) {
    fs.readFile(fileName, {encoding: 'utf8'}, function (err, data) {
      if (err) throw Error('error');
      resolve(data)
    });
  });
};

let doSomething = function *() {
  let lorem = yield moretext(1);
  yield promiseWriteToFile(lorem);
  let text = yield promiseReadFromFile('./test.txt');
  return text;
}

let onFulfilled = (value) => {
  console.log('we cool!', value);
}

let onRejected = (reason) => {
  console.log('not cool', reason);
}

let catchErr = (err) => {
  console.log('fatal error');
}

co(doSomething)
  .then(onFulfilled, onRejected)
  .catch(catchErr);

