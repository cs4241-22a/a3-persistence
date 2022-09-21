import { h, Component } from '@stencil/core';
export class CardBody {
  render() {
    return (h("div", { class: "c-card__body" },
      h("slot", null)));
  }
  static get is() { return "blaze-card-body"; }
}
