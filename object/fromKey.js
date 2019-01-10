const { perf, measure } = require("../lib");

var obj1 = { a: 1, b: 2, c: 3, d: 4 };
var obj2 = { a: 1, c: 3, d: 4 };
var obj3 = { a: 1, b: 2, d: 4 };
var obj4 = { a: 1, b: 2, c: 3 };
var obj5 = { a: 1, b: 2, c: 3, d: 4, e: 1 };
var obj6 = { a: 1, b: 2, c: 3, e: 4 };
var obj7 = { a: 1, b: 2, c: 3, d: 4, f: 1 };
var obj8 = { a: 1, b: 2, c: 3, f: 4 };

var arr = [obj1, obj2, obj3, obj3, obj4, obj5, obj6, obj7, obj8];

function get(obj, key) {
  return obj[key];
}

var prop = "a";
prop = 'b';
let k = 0;
perf({
  readArgProp: {
    direct: true,
    body() {
      return get(obj1, "a");
    }
  },
  readVarArgProp: {
    direct: true,
    body() {
      return get(obj1, prop);
    }
  },
  readVarProp: {
    body() {
      k++;
      var p = k===45446442435 ? 'b' : 'a';
      measure(() => {
        return obj1[p];
      });
    }
  },
  readDirectProp: {
    direct: true,
    body() {
      return obj1.a;
    }
  }
});
