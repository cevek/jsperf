const {perf, measure} = require('../lib');
const numberArray = [];
const objArray = [];
const obj = {};
for (let i = 0; i < 1e3; i++) {
    numberArray.push(i);
    objArray.push(obj);
}
perf({
    '[num].push': [10, 100, 1000].map(size => ({
        name: size,
        subTimes: size,
        times: 1e5,
        body() {
            var arr = [];
            for (let i = 0; i < size; i++) measure(() => arr.push(i));
        },
    })),

    '[num].pop': [10, 100, 1000].map(size => ({
        name: size,
        subTimes: size,
        times: 1e5,
        body() {
            var arr = numberArray.slice(0, size);
            for (let i = 0; i < size; i++) measure(() => arr.pop());
        },
    })),

    '[obj].push': [10, 100, 1000].map(size => ({
        name: size,
        subTimes: size,
        times: 1e5,
        body() {
            var arr = [];
            for (let i = 0; i < size; i++) measure(() => arr.push(obj));
        },
    })),

    '[obj].pop': [10, 100, 1000].map(size => ({
        name: size,
        subTimes: size,
        times: 1e5,
        body() {
            var arr = objArray.slice(0, size);
            for (let i = 0; i < size; i++) measure(() => arr.pop());
        },
    })),
});


`
node: v10.12.0
CPU: Intel(R) Core(TM) i7-3615QM CPU @ 2.30GHz
┌────────────┬────┬─────┬──────┐
│  (index)   │ 10 │ 100 │ 1000 │
├────────────┼────┼─────┼──────┤
│ [num].push │ 4  │  6  │  5   │
│ [num].pop  │ 0  │  1  │  1   │
│ [obj].push │ 5  │  7  │  6   │
│ [obj].pop  │ 2  │  1  │  2   │
└────────────┴────┴─────┴──────┘
`