import { h, Component } from '@stencil/core';
export class Tree {
  render() {
    return (h("div", { role: "tree", class: "c-tree" },
      h("slot", null)));
  }
  static get is() { return "blaze-tree"; }
}
