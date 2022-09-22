import { h, Component, Listen, Element, State, Prop } from '@stencil/core';
export class Sticky {
  constructor() {
    this.top = 0;
  }
  componentWillUpdate() {
    this.positionElement();
  }
  positionElement() {
    this.dimensions = this.elem.children[0].getBoundingClientRect();
    this.offsetTop = this.dimensions.top + window.scrollY;
    if (this.offsetTop - window.scrollY - this.top <= 0) {
      this.staticStyles = {
        width: `${this.dimensions.width}px`,
        height: `${this.dimensions.height}px`,
      };
      this.stickyStyles = {
        position: 'fixed',
        top: `${this.top}px`,
        left: `${this.dimensions.left}px`,
        width: `${this.dimensions.width}px`,
      };
    }
    else {
      this.staticStyles = {};
      this.stickyStyles = {};
    }
  }
  render() {
    return (h("div", { style: this.staticStyles },
      h("div", { style: this.stickyStyles },
        h("slot", null))));
  }
  static get is() { return "blaze-sticky"; }
  static get properties() { return {
    "top": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "top",
      "reflect": false,
      "defaultValue": "0"
    }
  }; }
  static get states() { return {
    "staticStyles": {},
    "stickyStyles": {}
  }; }
  static get elementRef() { return "elem"; }
  static get listeners() { return [{
      "name": "resize",
      "method": "positionElement",
      "target": "window",
      "capture": false,
      "passive": true
    }, {
      "name": "scroll",
      "method": "positionElement",
      "target": "document",
      "capture": false,
      "passive": true
    }]; }
}
