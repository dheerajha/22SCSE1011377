// test.js
const log = require('./log');

(async () => {
  await log("backend", "error", "handler", "received string, expected boolean");
})();
