import { h, Component, Prop, State, Event } from '@stencil/core';
export class FileUpload {
  constructor() {
    this.url = '/';
    this.files = [];
  }
  async uploadFiles(e) {
    this.files = Array.from(e.target.files);
    if (this.drop) {
      try {
        this.onUploading.emit({ files: this.files });
        await Promise.all(this.files.map((file) => fetch(this.url, {
          method: 'POST',
          body: file,
        })));
        this.onUploaded.emit({ upload: true, files: this.files });
      }
      catch (error) {
        this.onUploaded.emit({ upload: false, error });
      }
    }
  }
  renderLabel() {
    if (!this.drop && this.files.length > 0) {
      if (this.multiple)
        return h("span", null,
          this.files.length,
          " files");
      return h("span", null, this.files[0].name);
    }
  }
  render() {
    const dropClass = this.drop ? 'c-file-upload--drop' : '';
    return (h("div", { class: `c-file-upload ${dropClass}` },
      h("slot", null),
      this.renderLabel(),
      h("input", { type: "file", multiple: this.multiple, onChange: (e) => this.uploadFiles(e) })));
  }
  static get is() { return "blaze-file-upload"; }
  static get properties() { return {
    "drop": {
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
      "attribute": "drop",
      "reflect": false
    },
    "multiple": {
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
      "attribute": "multiple",
      "reflect": false
    },
    "url": {
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
      "attribute": "url",
      "reflect": false,
      "defaultValue": "'/'"
    }
  }; }
  static get states() { return {
    "files": {}
  }; }
  static get events() { return [{
      "method": "onUploaded",
      "name": "uploaded",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "onUploading",
      "name": "uploading",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
}
