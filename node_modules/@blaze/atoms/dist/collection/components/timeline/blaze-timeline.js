import { h, Component, Prop } from '@stencil/core';
export class Timeline {
  render() {
    const alternateClass = this.alternate ? 'o-timeline--alternate' : '';
    const loadingClass = this.loading ? 'o-timeline--loading' : '';
    return (h("ol", { class: `o-timeline ${alternateClass} ${loadingClass}` },
      h("slot", null)));
  }
  static get is() { return "blaze-timeline"; }
  static get properties() { return {
    "alternate": {
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
      "attribute": "alternate",
      "reflect": false
    },
    "loading": {
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
      "attribute": "loading",
      "reflect": false
    }
  }; }
}
