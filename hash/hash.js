const { perf, measure } = require("../lib");
var strings = [
  "foo bar",
  "foo bar bar bar bar ",
  "blablablaasf f aflkj  kппофло фа олд gagk g jglakj lajg kaj",
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt"
];

perf({
  murmur: {
    body() {
      measure(() => {
        doHash("foo bar hello", 235);
      });
    }
  },

  simple: strings.map(str => ({
    name: str.length,
    body() {
      measure(() => {
        simpleHash(str);
      });
    }
  })),
  simple2: strings.map(str => ({
    name: str.length,
    body() {
      measure(() => {
        simpleHash2(str);
      });
    }
  }))
});

function simpleHash(str) {
  for (let i = 0; i < str.length; i++) {
    const sym = str.charCodeAt(i);
  }
}

function simpleHash2(str) {
  let i = 0;
  for (i = 0; i < str.length - 11; i += 12) {
    const s1 = str.charCodeAt(i);
    const s2 = str.charCodeAt(i + 1);
    const s3 = str.charCodeAt(i + 2);
    const s4 = str.charCodeAt(i + 3);
    const s5 = str.charCodeAt(i + 4);
    const s6 = str.charCodeAt(i + 5);

    const s7 = str.charCodeAt(i + 6);
    const s8 = str.charCodeAt(i + 7);
    const s9 = str.charCodeAt(i + 8);
    const s10 = str.charCodeAt(i + 9);
    const s11 = str.charCodeAt(i + 10);
  }
  for (let j = i; j < str.length; j++) {
    const s6 = str.charCodeAt(j);
  }
}

function abc(str) {
  for (let j = 0; j < 1e6; j++) {
    for (let i = 0; i < str.length; i++) {
      const sym1 = str.charCodeAt(i);
    }
  }
}

console.time("perf");
abc("foo bar hello");
console.timeEnd("perf");

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return (
    str.charCodeAt(pos++) +
    (str.charCodeAt(pos++) << 8) +
    (str.charCodeAt(pos++) << 16) +
    (str.charCodeAt(pos) << 24)
  );
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = (nlo * m + (((nhi * m) & 0xffff) << 16)) | 0;
  return res;
}

function getBucket(str, buckets) {
  var hash = doHash(str, str.length);
  var bucket = hash % buckets;
  return bucket;
}
