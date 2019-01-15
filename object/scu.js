const { perf, measure } = require("../lib");
function main() {
  class FF {
    constructor(props) {
      this.props = props;
      const inner = {
        atom: {},
        props: [],
        propsObj: {}
      };
      this.__inner = inner;
      inner.propsObj = props;
      inner.props = toPropsArr(props);
    }
    noScu(newProps) {
      return false;
    }
    arrCacheScu(newProps) {
      let shouldUpdate = false;
      const inner = this.__inner;
      const arr = inner.props;
      const props = newProps;
      let i = 0;
      let foundDiff = false;
      for (const prop in props) {
        const value = props[prop];
        const oldProp = arr[i];
        const oldVal = arr[i + 1];
        if (oldProp !== prop) {
          foundDiff = true;
          break;
        }
        if (oldVal !== value) {
          arr[i + 1] = value;
          shouldUpdate = true;
        }
        i += 2;
      }
      if (foundDiff) {
        inner.props = toPropsArr(newProps);
        shouldUpdate = false;
      } else if (!isAtomActual(inner.atom)) {
          shouldUpdate = true;
      }
      return shouldUpdate;
    }
    arrCache2Scu(props) {
      let shouldUpdate = false;
      const inner = this.__inner;
      const arr = inner.props;
      let i = 0;
      // let foundDiff = false;
      for (let i = 0; i < arr.length; i += 2) {
        const prop = arr[i];
        const value = arr[i + 1];
        if (props[prop] !== value) {
          shouldUpdate = false;
          break;
        }
      }
      return shouldUpdate || isAtomActual(inner.atom);
    }
    naiveScu(newProps) {
      const inner = this.__inner;
      const oldProps = inner.propsObj;
      let newPropsCount = 0;
      let oldPropsCount = 0;
      let shouldUpdate = false;
      for (const prop in newProps) {
        newPropsCount++;
        if (oldProps[prop] !== newProps[prop]) {
          shouldUpdate = true;
          break;
        }
      }
      for (const prop in oldProps) {
        oldPropsCount++;
      }
      return shouldUpdate || newPropsCount !== oldPropsCount;
    }
  }
  function isAtomActual(atom) {
    return false;
  }
  function toPropsArr(props) {
    const arr = [];
    for (const prop in props) {
      arr.push(prop, props[prop]);
    }
    return arr;
  }

  var objs = [
    () => ({ a: 1 }),
    () => ({ a: 1, b: 2 }),
    () => ({ a: 1, b: 2, c: 3 }),
    () => ({ a: 1, b: 2, c: 3, d: 4 }),
    () => ({ a: 1, b: 2, c: 3, d: 4, e: 5 }),
    () => ({ a: 1, c: 3 }),
    () => ({ a: 1, c: 3, d: 4 }),
    () => ({ a: 1, c: 3, d: 4, e: 5 })
  ];

  var classes = [
    new class extends FF {
      constructor(p) {
        super(p);
        this.a = 1;
      }
    }(objs[0]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.b = 1;
      }
    }(objs[1]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.c = 1;
      }
    }(objs[2]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.d = 1;
      }
    }(objs[3]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.e = 1;
      }
    }(objs[4]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.f = 1;
      }
    }(objs[5]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.g = 1;
      }
    }(objs[6]()),
    new class extends FF {
      constructor(p) {
        super(p);
        this.h = 1;
      }
    }(objs[7]())
  ];

  let i = 0;
  perf({
    NoScu: {
      direct: true,
      body() {
        i++;
        const newProps = objs[i & 7]();
        const cls = classes[i & 7];
        return cls.noScu(newProps);
      }
    },
    ArrCache: {
      direct: true,
      body() {
        i++;
        const newProps = objs[i & 7]();
        const cls = classes[i & 7];
        return cls.arrCacheScu(newProps);
      }
    },
    ArrCache2: {
      direct: true,
      body() {
        i++;
        const newProps = objs[i & 7]();
        const cls = classes[i & 7];
        return cls.arrCache2Scu(newProps);
      }
    },
    Naive: {
      direct: true,
      body() {
        i++;
        const newProps = objs[i & 7]();
        const cls = classes[i & 7];
        return cls.naiveScu(newProps);
      }
    }
  });
}
main();

