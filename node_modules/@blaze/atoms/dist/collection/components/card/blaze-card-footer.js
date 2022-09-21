import { h, Component } from '@stencil/core';
export class CardFooter {
  render() {
    return (h("footer", { class: "c-card__footer" },
      h("slot", null)));
  }
  static get is() { return "blaze-card-footer"; }
}
