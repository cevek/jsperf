const {perf, measure} = require('../lib');
const numberArray = [];
const objArray = [];
const obj = {};
for (let i = 0; i < 1e3; i++) {
    numberArray.push(i);
    objArray.push(obj);
}
perf({
    'pop': [10, 50, 100, 1000].map(size => ({
        name: size,
        times: 1e5,
        body() {
            var arr = objArray.slice(0, size);
            for (let i = 0; i < size; i++) measure(() => arr.pop());
        },
    })),
    '.length': [10, 50, 100, 1000].map(size => ({
        name: size,
        times: 1e6,
        body() {
            var arr = objArray.slice(0, size);
            measure(() => arr.length = 0);
        },
    })),
});

`
node: v10.12.0
CPU: Intel(R) Core(TM) i7-3615QM CPU @ 2.30GHz
┌─────────┬─────┬────┬─────┬──────┐
│ (index) │ 10  │ 50 │ 100 │ 1000 │
├─────────┼─────┼────┼─────┼──────┤
│   pop   │ 13  │ 60 │ 150 │ 1470 │
│ .length │ 108 │ 99 │ 96  │ 105  │
└─────────┴─────┴────┴─────┴──────┘
`