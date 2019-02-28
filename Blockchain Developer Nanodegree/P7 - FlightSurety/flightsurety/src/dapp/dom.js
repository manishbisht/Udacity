// Source: https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff

export default class DOM {

    static a = (...args) => DOM.makeElement(`a`, ...args);
    static button = (...args) => DOM.makeElement(`button`, ...args);
    static div = (...args) => DOM.makeElement(`div`, ...args);
    static h1 = (...args) => DOM.makeElement(`h1`, ...args);
    static h2 = (...args) => DOM.makeElement(`h2`, ...args);
    static h3 = (...args) => DOM.makeElement(`h3`, ...args);
    static h4 = (...args) => DOM.makeElement(`h4`, ...args);
    static h5 = (...args) => DOM.makeElement(`h5`, ...args);
    static header = (...args) => DOM.makeElement(`header`, ...args);
    static section = (...args) => DOM.makeElement(`section`, ...args);
    static p = (...args) => DOM.makeElement(`p`, ...args);
    static span = (...args) => DOM.makeElement(`span`, ...args);
    static img = (...args) => DOM.makeElement(`img`, ...args);
    static td = (...args) => DOM.makeElement(`td`, ...args);
    static attributeExceptions = [
      `role`,
    ];
    
    static elid(id) { 
      return document.getElementById(id);
    }
  
    static appendText(el, text) {
      const textNode = document.createTextNode(text);
      el.appendChild(textNode);
    }
    
    static appendArray(el, children) {
      children.forEach((child) => {
        if (Array.isArray(child)) {
          DOM.appendArray(el, child);
        } else if (child instanceof window.Element) {
          el.appendChild(child);
        } else if (typeof child === `string`) {
          DOM.appendText(el, child);
        }
      });
    }
    
    static setStyles(el, styles) {
      if (!styles) {
        el.removeAttribute(`styles`);
        return;
      }
    
      Object.keys(styles).forEach((styleName) => {
        if (styleName in el.style) {
          el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
          console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
        }
      });
    }
    
    static makeElement(type, textOrPropsOrChild, ...otherChildren) {
      const el = document.createElement(type);
    
      if (Array.isArray(textOrPropsOrChild)) {
        DOM.appendArray(el, textOrPropsOrChild);
      } else if (textOrPropsOrChild instanceof window.Element) { 
        el.appendChild(textOrPropsOrChild);
      } else if (typeof textOrPropsOrChild === `string`) {
        DOM.appendText(el, textOrPropsOrChild);
      } else if (typeof textOrPropsOrChild === `object`) {
        Object.keys(textOrPropsOrChild).forEach((propName) => {
          if (propName in el || attributeExceptions.includes(propName)) {
            const value = textOrPropsOrChild[propName];
    
            if (propName === `style`) {
              DOM.setStyles(el, value);
            } else if (value) {
              el[propName] = value;
            }
          } else {
            console.warn(`${propName} is not a valid property of a <${type}>`);
          }
        });
      }
    
      if (otherChildren) DOM.appendArray(el, otherChildren);
    
      return el;
    }
  }
    