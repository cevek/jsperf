const { perf, measure } = require("../lib");

function hasChanges(props, oldProps) {
  let hasChanges = true;
  if (isObj(props) && isObj(oldProps)) {
    let newPropsCount = 0;
    let oldPropsCount = 0;
    for (const attr in props) {
      if (oldProps[attr] !== props[attr]) {
        hasChanges = true;
        break;
      }
      newPropsCount++;
    }
    if (!hasChanges) {
      for (const attr in oldProps) oldPropsCount++;
      hasChanges = newPropsCount !== oldPropsCount;
    }
  }
  return hasChanges || props !== oldProps;
}

function forInWithoutGetProp(props, oldProps) {
  let hasChanges = true;
  if (isObj(props) && isObj(oldProps)) {
    let newPropsCount = 0;
    let oldPropsCount = 0;
    for (const attr in props) newPropsCount++;
    for (const attr in oldProps) oldPropsCount++;
    hasChanges = newPropsCount !== oldPropsCount;
  }
  return hasChanges;
}

function hasChanges2(props, oldProps) {
  let hasChanges = true;
  if (isObj(props) && isObj(oldProps)) {
    let oldPropsCount = 0;
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      const attr = keys[i];
      if (oldProps[attr] !== props[attr]) {
        hasChanges = true;
        break;
      }
    }
    if (!hasChanges) {
      for (const attr in oldProps) oldPropsCount++;
      hasChanges = keys.length !== oldPropsCount;
    }
  }
  return hasChanges || props !== oldProps;
}

function isObj(val) {
  return typeof val === "object" && val !== null;
}

function compareArray(arr1, arr2) {
  let hasChanges = false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      hasChanges = true;
      break;
    }
  }
  return hasChanges;
}

function compareObjDirect(a, b) {
  return (
    isObj(a) &&
    isObj(b) &&
    a.a === b.a &&
    a.b === b.b &&
    a.c === b.c &&
    a.d === b.d
  );
}

var obj1 = { a: 1, b: 2, c: 3, d: 4 };
var obj2 = { a: 1, b: 2, c: 3, d: 4 };


perf({
  hasChangesViaForOf: {
    body() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4 };
      var obj2 = { a: 1, b: 2, c: 3, d: 4 };
      measure(() => {
        hasChanges(obj1, obj2);
      });
    }
  },
  hasChangesViaObjectKeys: {
    body() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4 };
      var obj2 = { a: 1, b: 2, c: 3, d: 4 };
      measure(() => {
        hasChanges2(obj1, obj2);
      });
    }
  },
  forInWithoutGetProp: {
    body() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4 };
      var obj2 = { a: 1, b: 2, c: 3, d: 4 };
      measure(() => {
        forInWithoutGetProp(obj1, obj2);
      });
    }
  },
  compareObjDirect: {
    body() {
      measure(() => {
        return compareObjDirect(obj1, obj2);
      });
    }
  },
  compareArray: {
    body() {
      var arr1 = [1, 2, 3, 4];
      var arr2 = [1, 2, 3, 4];
      measure(() => {
        compareArray(arr1, arr2);
      });
    }
  }
});
