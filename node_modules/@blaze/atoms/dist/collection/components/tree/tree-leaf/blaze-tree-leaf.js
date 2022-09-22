import { h, Component } from '@stencil/core';
export class TreeLeaf {
  render() {
    return (h("span", { role: "treeitem", class: "c-tree__item" },
      h("slot", null)));
  }
  static get is() { return "blaze-tree-leaf"; }
}
