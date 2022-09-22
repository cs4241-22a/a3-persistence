import { h, Component, Prop } from '@stencil/core';
export class Badge {
  render() {
    const typeClass = this.type ? `c-badge--${this.type}` : '';
    const roundedClass = this.rounded ? `c-badge--rounded` : '';
    const ghostClass = this.ghost ? `c-badge--ghost` : '';
    return (h("span", { class: `c-badge ${typeClass} ${roundedClass} ${ghostClass}` },
      h("slot", null)));
  }
  static get is() { return "blaze-badge"; }
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
      "reflect": false
    },
    "rounded": {
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
      "attribute": "rounded",
      "reflect": false
    },
    "ghost": {
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
      "attribute": "ghost",
      "reflect": false
    }
  }; }
}
