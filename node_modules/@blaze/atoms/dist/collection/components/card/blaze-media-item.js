import { h, Component } from '@stencil/core';
export class MediaItem {
  render() {
    return (h("div", { class: "c-card__item o-media" },
      h("slot", null)));
  }
  static get is() { return "blaze-media-item"; }
}
