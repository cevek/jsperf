function main(global) {
    let MEASURE_NEED_CALL = false;
    let dumpCounter = 0;
    const GC = typeof gc === 'function' ? gc : () => {};
    function measure(fn) {
        return MEASURE_NEED_CALL ? fn() : dumpCounter;
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
        var res;
        for (var i = 0; i < times; i++) {
            res = body();
        }
        return i === 128325723 ? res : Date.now() - start;
    }
    function perf(obj) {
        const result = {};
        measureTest(10, () => 1);
        measureInit(10, () => 2);
        for (const groupKey in obj) {
            let group = obj[groupKey];
            result[groupKey] = {};
            if (typeof group.body === 'function') group = { Result: group };
            if (typeof group === 'function') group = { Resul: { body: group } };
            for (const subGroupName in group) {
                let subGroup = group[subGroupName];
                if (typeof subGroup === 'function') subGroup = { body: subGroup };
                const subTimes = subGroup.subTimes || 1;
                const body = subGroup.body;
                const direct = subGroup.direct;
                dumpCounter++;
                measureTest(10, body);
                measureInit(10, body);
                measureInit(1000, body);
                const time = measureTest(1000, body);
                const times = subGroup.times || (time > 10 ? 1e4 : time > 1 ? 1e5 : 1e6);
                const mult = 1e6 / times;
                const initDur = direct ? 0 : measureInit(times, body);
                GC();
                const dur = measureTest(times, body) - initDur;
                // GC();
                result[groupKey][subGroup.name || subGroupName] = Math.max(Math.round((dur * mult) / subTimes), 0);
            }
        }
        if (typeof process !== 'undefined') {
            const os = require('os');
            console.log(`node: ${process.version}\nCPU: ${os.cpus()[0].model}`);
        }
        console.table(result);
        console.log(result);
        if (typeof window !== 'undefined') {
            const cols = new Set();
            for (const key in result) for (const col in result[key]) cols.add(col);
            let html = '<table><tr><th>Test</th>';
            for (const col of cols) html += `<th>${col}</th>`;
            html += '</tr>';
            for (const key in result) {
                html += `<tr><td>${key}</td>`;
                for (const col of cols) {
                    html += `<td>${result[key][col]}</td>`;
                }
                html += `</tr>`;
            }
            html += '</table>';
            document.body.innerHTML = html;
        }
        if (!obj) eval('');
    }

    global.measure = measure;
    global.perf = perf;
}
main(typeof window === 'undefined' ? module.exports : window);
