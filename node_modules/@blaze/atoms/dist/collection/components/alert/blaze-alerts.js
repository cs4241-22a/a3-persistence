import { h, Component, Prop } from '@stencil/core';
export class Alerts {
  render() {
    const positionClass = this.position ? `c-alerts--${this.position}` : '';
    return (h("div", { role: "presentation", class: `c-alerts ${positionClass}` },
      h("slot", null)));
  }
  static get is() { return "blaze-alerts"; }
  static get properties() { return {
    "position": {
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
      "attribute": "position",
      "reflect": false
    }
  }; }
}
