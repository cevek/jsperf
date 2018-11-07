const { perf, measure } = require('../lib');
function fn(level) {
    return level > 1 ? fn(level - 1) : null;
}
function fnCall(level) {
    return level > 1 ? fnCall.call(null, level - 1) : null;
}

let applyLevel = 0;
function fnApply() {
    applyLevel--;
    return applyLevel > 0 ? fnApply.apply(null, arguments) : null;
}
perf({
    fn: {
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
                fnCall(100);
            });
        },
    },
    '.apply': {
        subTimes: 100,
        body() {
            measure(() => {
                applyLevel = 100;
                fnApply(100);
            });
        },
    },
});
