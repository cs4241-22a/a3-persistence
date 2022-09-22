import { h, Component, Prop } from '@stencil/core';
export class MediaImage {
  render() {
    return (h("div", { class: "o-media__image" },
      h("img", { class: "o-image", alt: this.alt, src: this.src })));
  }
  static get is() { return "blaze-media-image"; }
  static get properties() { return {
    "src": {
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
      "attribute": "src",
      "reflect": false
    },
    "alt": {
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
      "attribute": "alt",
      "reflect": false
    }
  }; }
}
