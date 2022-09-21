import { h, Component } from '@stencil/core';
export class AddressHeading {
  render() {
    return (h("span", { class: "c-address__heading" },
      h("slot", null)));
  }
  static get is() { return "blaze-address-heading"; }
}
