import { h, Component, Prop } from '@stencil/core';
export class TimelineItem {
  render() {
    const typeClass = this.type ? `c-timeline-item--${this.type}` : '';
    const lastClass = this.last ? `c-timeline-item--last` : '';
    const leftClass = this.left ? `c-timeline-item--left` : '';
    const loadingClass = this.loading && !this.last ? `c-timeline-item--loading` : '';
    return (h("li", { class: `c-timeline-item ${typeClass} ${leftClass} ${lastClass} ${loadingClass}` },
      h("div", { class: "c-timeline-item__body" },
        h("slot", null))));
  }
  static get is() { return "blaze-timeline-item"; }
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
    "last": {
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
      "attribute": "last",
      "reflect": false
    },
    "left": {
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
      "attribute": "left",
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
