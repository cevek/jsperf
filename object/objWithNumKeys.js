const { perf, measure } = require('../lib');

var obj1 = { a: 1, b: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4 };
var obj2 = { a: 1, c: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 5: null };
var obj3 = { a: 1, d: 3, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 6: 0 };
var obj4 = { a: 1, e: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 7: 'str' };
var obj5 = { a: 1, f: 3, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 8: undefined };
var obj6 = { a: 1, y: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 9: 0 };
var obj7 = { a: 1, u: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 10: 0 };
var obj8 = { a: 1, i: 1, 0: 1, 1: null, 2: undefined, 3: {}, 4: 4, 11: 352 };

var objs = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8];

let k = 0;
let keyA = 'a';
let key0 = 0;
perf({
    numProp() {
        var obj = objs[k++ % objs.length];
        measure(() => {
            return obj[key0];
        });
    },
    namedProp() {
        var obj = objs[k++ % objs.length];
        measure(() => {
            return obj[keyA];
        });
    },
});

function abc() {
    var res;
    for (let i = 0; i < 1e7; i++) {
        // var obj = objs[i & 7];
        // var obj = objs[i & 7];
        // obj[0];
        // obj['a']
        // res = i === -1 ? 0 : obj[0];
        // res = i === -1 ? 0 : obj['a'];
    }
    return res;
}
console.time('perf')
abc();
console.timeEnd('perf')
