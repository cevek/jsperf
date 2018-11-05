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
    createElement() {
        measure(() => {
            const dom = document.createElement('div');
        });
    },
    appendChild() {
        const dom = document.createElement('div');
        const sub = document.createElement('div');
        measure(() => {
            dom.appendChild(sub);
        });
    },
    removeChild() {
        const dom = document.createElement('div');
        const sub = document.createElement('div');
        dom.appendChild(sub);
        measure(() => {
            dom.removeChild(sub);
        });
    },
    replaceChild() {
        const dom = document.createElement('div');
        const sub = document.createElement('div');
        const newSub = document.createElement('div');
        dom.appendChild(sub);
        measure(() => {
            dom.replaceChild(newSub, sub);
        });
    },
    setAttribute() {
        const dom = document.createElement('div');
        measure(() => {
            dom.setAttribute('className', 'foo');
        });
    },
    setAttributeRewrite() {
        measure(() => {
            tempDiv.setAttribute('className', 'foo');
        });
    },
    setClassName() {
        const dom = document.createElement('div');
        measure(() => {
            dom.className = 'foo';
        });
    },
    setClassNameRewrite() {
        measure(() => {
            tempDiv.className = 'foo';
        });
    },

    classList() {
        const dom = document.createElement('div');
        measure(() => {
            dom.classList.add('foo');
        });
    },
    classListRewrite() {
        measure(() => {
            tempDiv.classList.add('foo');
        });
    },

    getClassName() {
        measure(() => {
            return tempDiv.className;
        });
    },

    cloneNode1() {
        measure(() => {
            const dom = clone1.cloneNode(true);
        });
    },
    cloneNode2() {
        measure(() => {
            const dom = clone2.cloneNode(true);
        });
    },
    createElementTemplate() {
        measure(() => {
            const template = document.createElement('div');
            template.className = 'foo';
            const subTemplate = template.appendChild(document.createElement('div'));
            subTemplate.className = 'foo';
            const subSubTemplate = subTemplate.appendChild(document.createElement('div'));
            subSubTemplate.className = 'foo';
        });
    },
    cloneTemplate() {
        measure(() => {
            template.cloneNode(true);
        });
    },
    importNodeTemplate() {
        measure(() => {
            document.importNode(template, true);
        });
    },

    innerHTMLTemplate() {
        measure(() => {
            tempDiv.innerHTML = templateHTML;
        });
    },

    firstChild() {
        measure(() => {
            return clone2.firstChild;
        });
    },
    nextSibling() {
        const child = clone3.firstChild;
        measure(() => {
            return child.nextSibling;
        });
    },
});
