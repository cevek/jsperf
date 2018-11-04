const { perf, measure } = require('../lib');
const clone1 = document.createElement('div');
const clone2 = document.createElement('div');
clone2.appendChild(document.createElement('div'));

const clone3 = document.createElement('div');
clone3.appendChild(document.createElement('div'));
clone3.appendChild(document.createElement('div'));
clone3.appendChild(document.createElement('div'));
clone3.appendChild(document.createElement('div'));

const template = document.createElement('div');
template.setAttribute('className', 'foo');
// template.className = 'foo';
const subTemplate = template.appendChild(document.createElement('div'));
subTemplate.setAttribute('className', 'foo');
// template.className = 'foo';

const subSubTemplate = subTemplate.appendChild(document.createElement('div'));
subSubTemplate.setAttribute('className', 'foo');
// template.className = 'foo';

const tempDiv = document.createElement('div');
tempDiv.setAttribute('className', 'foo');
const templateHTML = template.innerHTML;

perf({
    createElement: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    const dom = document.createElement('div');
                });
            },
        },
    },
    appendChild: {
        1: {
            times: 1e5,
            body() {
                const dom = document.createElement('div');
                const sub = document.createElement('div');
                measure(() => {
                    dom.appendChild(sub);
                });
            },
        },
    },
    removeChild: {
        1: {
            times: 1e5,
            body() {
                const dom = document.createElement('div');
                const sub = document.createElement('div');
                dom.appendChild(sub);
                measure(() => {
                    dom.removeChild(sub);
                });
            },
        },
    },
    replaceChild: {
        1: {
            times: 1e5,
            body() {
                const dom = document.createElement('div');
                const sub = document.createElement('div');
                const newSub = document.createElement('div');
                dom.appendChild(sub);
                measure(() => {
                    dom.replaceChild(newSub, sub);
                });
            },
        },
    },
    setAttribute: {
        1: {
            times: 1e5,
            body() {
                const dom = document.createElement('div');
                measure(() => {
                    dom.setAttribute('className', 'foo');
                });
            },
        },
    },
    setAttributeRewrite: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    tempDiv.setAttribute('className', 'foo');
                });
            },
        },
    },
    setClassName: {
        1: {
            times: 1e5,
            body() {
                const dom = document.createElement('div');
                measure(() => {
                    dom.className = 'foo';
                });
            },
        },
    },
    setClassNameRewrite: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    tempDiv.className = 'foo';
                });
            },
        },
    },

    cloneNode1: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    const dom = clone1.cloneNode(true);
                });
            },
        },
    },
    cloneNode2: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    const dom = clone2.cloneNode(true);
                });
            },
        },
    },
    createElementTemplate: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    const template = document.createElement('div');
                    template.className = 'foo';
                    const subTemplate = template.appendChild(document.createElement('div'));
                    subTemplate.className = 'foo';
                    const subSubTemplate = subTemplate.appendChild(document.createElement('div'));
                    subSubTemplate.className = 'foo';
                });
            },
        },
    },
    cloneTemplate: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    template.cloneNode(true);
                });
            },
        },
    },
    importNodeTemplate: {
        1: {
            times: 1e5,
            body() {
                measure(() => {
                    document.importNode(template, true);
                });
            },
        },
    },

    innerHTMLTemplate: {
        1: {
            times: 1e4,
            body() {
                measure(() => {
                    tempDiv.innerHTML = templateHTML;
                });
            },
        },
    },

    firstChild: {
        1: {
            body() {
                measure(() => {
                    clone2.firstChild;
                });
            },
        },
    },
    nextSibling: {
        1: {
            body() {
                const child = clone3.firstChild;
                measure(() => {
                    child.nextSibling;
                });
            },
        },
    },
});
