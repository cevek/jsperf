const { perf, measure } = require("../lib");
var str = "foobar todo";
var str2 = "foo";
var str2Codes = ["f".charCodeAt(0), "o".charCodeAt(0), "o".charCodeAt(0)];
var str2Arr = ["f", "o", "o"];
let counter = 0;
perf({
  substr: {
    body() {
      measure(() => {
        return str.substr(0, 3) === str2;
      });
    }
  },
  substring: {
    body() {
      measure(() => {
        return str.substring(0, 3) === str2;
      });
    }
  },
  directCompare: {
    body() {
      if (counter++ < 0) str2Arr = [];
      measure(() => {
        return (
          str[0] === str2Arr[0] &&
          str[1] === str2Arr[1] &&
          str[2] === str2Arr[2]
        );
      });
    }
  },

  directCompareCharAt: {
    body() {
      measure(() => {
        return (
          str.charAt(0) === str2Arr[0] &&
          str.charAt(1) === str2Arr[1] &&
          str.charAt(2) === str2Arr[2]
        );
      });
    }
  },
  directCompareCharCode: {
    body() {
      measure(() => {
        return (
          str.charCodeAt(0) === str2Codes[0] &&
          str.charCodeAt(1) === str2Codes[1] &&
          str.charCodeAt(2) === str2Codes[2]
        );
      });
    }
  }
});
