import { h, Component, Event, State, Method } from '@stencil/core';
export class TreeBranch {
  constructor() {
    this.expanded = false;
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
    if (this.expanded)
      this.onExpand.emit();
    else
      this.onCollapse.emit();
  }
  async expand() {
    this.expanded = true;
  }
  async collapse() {
    this.expanded = false;
  }
  render() {
    return [
      h("button", { role: "treeitem", "aria-expanded": this.expanded.toString(), class: "c-tree__item", onClick: () => this.toggleExpanded() },
        h("slot", { name: "branch" })),
      h("div", { role: "tree", class: "c-tree" },
        h("slot", { name: "leaf" })),
    ];
  }
  static get is() { return "blaze-tree-branch"; }
  static get states() { return {
    "expanded": {}
  }; }
  static get events() { return [{
      "method": "onExpand",
      "name": "expand",
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
      "method": "onCollapse",
      "name": "collapse",
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
    "expand": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
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
    "collapse": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
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
    }
  }; }
}
