import { h, Component } from '@stencil/core';
export class MediaBody {
  render() {
    return (h("div", { class: "o-media__body" },
      h("slot", null)));
  }
  static get is() { return "blaze-media-body"; }
}
