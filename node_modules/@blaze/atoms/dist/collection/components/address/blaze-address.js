import { h, Component } from '@stencil/core';
export class Address {
  render() {
    return (h("address", { class: "c-address" },
      h("slot", null)));
  }
  static get is() { return "blaze-address"; }
}
