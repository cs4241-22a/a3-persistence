import { h, Component } from '@stencil/core';
export class Card {
  render() {
    return (h("div", { class: "c-card" },
      h("slot", null)));
  }
  static get is() { return "blaze-card"; }
}
