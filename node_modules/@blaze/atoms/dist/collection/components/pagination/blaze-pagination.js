import { h, Component, Event, Method, Prop, State } from '@stencil/core';
export class Pagination {
  constructor() {
    this.page = 1;
    this.pages = 1;
  }
  async goToPage(page) {
    if (page > 0 && page <= this.pages) {
      this._currentPage = page;
      this.onPage.emit(this._currentPage);
    }
  }
  async currentPage() {
    return this._currentPage;
  }
  componentWillLoad() {
    this._currentPage = this.page;
  }
  render() {
    return (h("nav", { class: "c-pagination" },
      h("button", { class: "c-pagination__control", onClick: () => this.goToPage(this._currentPage - 1), disabled: this._currentPage === 1 }, "\u2039"),
      h("div", { class: "c-pagination__pages" },
        this._currentPage > 1 && (h("button", { onClick: () => this.goToPage(this._currentPage - 1), class: "c-pagination__control" }, this._currentPage - 1)),
        h("button", { class: "c-pagination__control", "aria-current": true }, this._currentPage),
        this._currentPage < this.pages && (h("button", { onClick: () => this.goToPage(this._currentPage + 1), class: "c-pagination__control" }, this._currentPage + 1))),
      h("button", { class: "c-pagination__control", onClick: () => this.goToPage(this._currentPage + 1), disabled: this._currentPage === this.pages }, "\u203A")));
  }
  static get is() { return "blaze-pagination"; }
  static get properties() { return {
    "page": {
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
      "attribute": "page",
      "reflect": false,
      "defaultValue": "1"
    },
    "pages": {
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
      "attribute": "pages",
      "reflect": false,
      "defaultValue": "1"
    }
  }; }
  static get states() { return {
    "_currentPage": {}
  }; }
  static get events() { return [{
      "method": "onPage",
      "name": "page",
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
  static get methods() { return {
    "goToPage": {
      "complexType": {
        "signature": "(page: number) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "currentPage": {
      "complexType": {
        "signature": "() => Promise<number>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<number>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
}
