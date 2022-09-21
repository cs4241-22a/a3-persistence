import { h, Component } from '@stencil/core';
export class CardHeader {
  render() {
    return (h("header", { class: "c-card__header" },
      h("slot", null)));
  }
  static get is() { return "blaze-card-header"; }
}
