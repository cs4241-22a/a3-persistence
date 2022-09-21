import { h, Component, Element, State, Prop } from '@stencil/core';
export class Divider {
  constructor() {
    this.type = 'solid';
  }
  componentWillLoad() {
    this.content = !!this.el.innerHTML;
  }
  render() {
    const typeClass = this.type ? `c-divider--${this.type}` : '';
    return (h("div", { class: `c-divider ${typeClass}` }, this.content && (h("span", { class: "c-divider__content" },
      h("slot", null)))));
  }
  static get is() { return "blaze-divider"; }
  static get properties() { return {
    "type": {
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
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'solid'"
    }
  }; }
  static get states() { return {
    "content": {}
  }; }
  static get elementRef() { return "el"; }
}
