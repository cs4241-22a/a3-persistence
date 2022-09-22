import { h, Component, Prop } from '@stencil/core';
export class Panel {
  constructor() {
    this.height = 0;
  }
  render() {
    return (h("div", { class: "o-panel-container", style: { height: `${this.height}px` } },
      h("div", { class: "o-panel" },
        h("slot", null))));
  }
  static get is() { return "blaze-panel"; }
  static get properties() { return {
    "height": {
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
      "attribute": "height",
      "reflect": false,
      "defaultValue": "0"
    }
  }; }
}
