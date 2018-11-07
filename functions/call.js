const { perf, measure } = require('../lib');
function fn(level) {
    return level > 1 ? fn(level - 1) : null;
}
function noop() {

}
perf({
    'fn': {
        subTimes: 100,
        body() {
            measure(() => {
                fn(100);
            });
        },
    },
    '.call': {
        subTimes: 100,
        body() {
            measure(() => {
                for (let i = 0; i < 100; i++) {
                    noop.call(null);
                }
            });
        },
    },
    '.apply': {
        subTimes: 100,
        body() {
            measure(() => {
                for (let i = 0; i < 100; i++) {
                    noop.apply(null);
                }
            });
        },
    },
});
