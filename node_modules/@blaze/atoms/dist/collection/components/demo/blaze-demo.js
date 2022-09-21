import { h, Component, Prop, State } from '@stencil/core';
export class Demo {
  constructor() {
    this.classes = '';
    this.language = '';
    this.demo = true;
  }
  componentWillLoad() {
    this.markup = this.code;
  }
  updateDemo(e) {
    this.markup = e.target.innerText;
  }
  highlight() {
    if (typeof hljs !== 'undefined') {
      hljs.highlightElement(this.codeRef);
    }
  }
  componentDidUpdate() {
    this.highlight();
  }
  componentDidLoad() {
    this.highlight();
  }
  render() {
    return [
      this.demo && (h("div", { "aria-label": "Demo component", class: `demo-markup-source u-letter-box-small ${this.classes}`, innerHTML: this.markup })),
      h("div", { class: "u-letter-box-small" },
        h("pre", { class: "u-pre" },
          h("code", { ref: (ref) => (this.codeRef = ref), "aria-hidden": true, tabindex: "-1", class: `u-code u-code--multiline ${this.language}`, contenteditable: this.demo, onBlur: (e) => this.updateDemo(e) }, this.markup))),
    ];
  }
  static get is() { return "blaze-demo"; }
  static get properties() { return {
    "classes": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "classes",
      "reflect": false,
      "defaultValue": "''"
    },
    "code": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "code",
      "reflect": false
    },
    "language": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "language",
      "reflect": false,
      "defaultValue": "''"
    },
    "demo": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "demo",
      "reflect": false,
      "defaultValue": "true"
    }
  }; }
  static get states() { return {
    "markup": {}
  }; }
}
