import { h, Component, Element, Event, Listen } from '@stencil/core';
export class Accordion {
  onTogglePane(ev) {
    const accordion = this.element.children[0];
    const open = ev.detail;
    const pane = ev.target;
    const idx = [].indexOf.call(accordion.children, pane);
    this.onToggle.emit({ idx, open });
  }
  render() {
    return (h("div", { class: "c-card c-card--accordion" },
      h("slot", null)));
  }
  static get is() { return "blaze-accordion"; }
  static get events() { return [{
      "method": "onToggle",
      "name": "toggle",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get listeners() { return [{
      "name": "togglepane",
      "method": "onTogglePane",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
