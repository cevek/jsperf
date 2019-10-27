const { perf, measure } = require('../lib');
var obj = new Proxy({ a: 1, b: 1 }, {});

perf({
    numProp() {
        measure(() => {
            return obj.a;
        });
    },
});
