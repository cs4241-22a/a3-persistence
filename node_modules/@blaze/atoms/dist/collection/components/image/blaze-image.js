import { h, Component, Element, Prop, State } from '@stencil/core';
export class Image {
  constructor() {
    this.filter = ''; // filter based on search term
  }
  generateSrc() {
    if (this.src)
      return this.src;
    let size = '';
    if (this.width && this.height) {
      size = `${this.width}x${this.height}/`;
    }
    let filter = '';
    if (this.filter) {
      filter = `?${this.filter}`;
    }
    if (this.photo) {
      return `https://source.unsplash.com/${this.photo}/${size}`;
    }
    if (this.user) {
      return this.likes
        ? `https://source.unsplash.com/user/${this.user}/likes/${size}${filter}`
        : `https://source.unsplash.com/user/${this.user}/${size}${filter}`;
    }
    if (this.collection) {
      return `https://source.unsplash.com/collection/${this.collection}/${size}${filter}`;
    }
    return `https://source.unsplash.com/random/${size}${filter}`;
  }
  componentDidLoad() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          this.loadImage();
          this.cleanup();
        }
      });
      this.io.observe(this.el);
    }
    else {
      this.loadImage();
    }
  }
  disconnectedCallback() {
    this.cleanup();
  }
  loadImage() {
    this._src = this.generateSrc();
  }
  cleanup() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }
  render() {
    return h("img", { class: "o-image", src: this._src, alt: this.alt });
  }
  static get is() { return "blaze-image"; }
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
    },
    "width": {
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
      "attribute": "width",
      "reflect": false
    },
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
      "reflect": false
    },
    "photo": {
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
      "attribute": "photo",
      "reflect": false
    },
    "user": {
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
      "attribute": "user",
      "reflect": false
    },
    "likes": {
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
      "attribute": "likes",
      "reflect": false
    },
    "collection": {
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
      "attribute": "collection",
      "reflect": false
    },
    "filter": {
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
      "attribute": "filter",
      "reflect": false,
      "defaultValue": "''"
    }
  }; }
  static get states() { return {
    "_src": {}
  }; }
  static get elementRef() { return "el"; }
}
