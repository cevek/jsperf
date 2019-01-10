const { perf, measure } = require("../lib");

var objs = [
  { a: 1 },
  { a: 1, b: 2 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3, d: 4 },
  { a: 1, b: 2, c: 3, d: 4, e: 5 },
  { a: 1, c: 3 },
  { a: 1, c: 3, d: 4 },
  { a: 1, c: 3, d: 4, e: 5 }
];

let i = 0;
perf({
  ObjectKeys: {
    direct: true,
    body() {
      const obj = objs[i++ & 7];
      const keys = Object.keys(obj);
      let ret;
      for (let j = 0; j < keys.length; j++) {
        ret = obj[keys[j]];
      }
      return ret;
    }
  },
  ObjectEntries: {
    direct: true,
    body() {
      let ret;
      const obj = objs[i++ & 7];
      for (const entry of Object.entries(obj)) {
        entry[0];
        ret = entry[1];
      }
      return ret;
    }
  },
  forIn: {
    direct: true,
    body() {
      let ret;
      const obj = objs[i++ & 7];
      for (const key in obj) {
        ret = obj[key];
      }
      return ret;
    }
  }
});
