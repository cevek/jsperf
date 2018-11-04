function main(global) {
    let MEASURE_NEED_CALL = false;
    let dumpCounter = 0;
    const GC = typeof gc === 'function' ? gc : ()=>{};
    function measure(fn) {
        return MEASURE_NEED_CALL ? fn() : dumpCounter++;
    }
    function measureInit(times, body) {
        MEASURE_NEED_CALL = false;
        const initTimes = times;
        const startInit = Date.now();
        for (let i = 0; i < initTimes; i++) {
            body();
        }
        return Date.now() - startInit;
    }

    function measureTest(times, body) {
        MEASURE_NEED_CALL = true;
        const start = Date.now();
        for (let i = 0; i < times; i++) {
            body();
        }
        return Date.now() - start;
    }
    function perf(obj) {
        const result = {};
        measureTest(10, () => 1);
        measureInit(10, () => 2);
        for (const groupKey in obj) {
            const group = obj[groupKey];
            result[groupKey] = {};
            for (const subGroupName in group) {
                const subGroup = group[subGroupName];
                const times = subGroup.times || 1e6;
                const subTimes = subGroup.subTimes || 1;
                const body = subGroup.body;
                const mult = 1e6 / times;
                measureTest(10, body);
                measureInit(10, body);
                measureTest(1000, body);
                measureInit(1000, body);
                const initDur = measureInit(times, body);
                GC();
                const dur = measureTest(times, body) - initDur;
                GC();
                result[groupKey][subGroup.name || subGroupName] = Math.max(Math.round((dur * mult) / subTimes), 0);
            }
        }
        if (typeof process !== 'undefined') {
            const os = require('os');
            console.log(`node: ${process.version}\nCPU: ${os.cpus()[0].model}`);
        }
        console.table(result);
        console.log(result);
        if (!obj) eval('');
    }

    global.measure = measure;
    global.perf = perf;
}
main(typeof window === 'undefined' ? module.exports : window);
