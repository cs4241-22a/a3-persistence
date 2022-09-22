import { h, Component, Element, Event, Method, State } from '@stencil/core';
export class Tabs {
  componentWillLoad() {
    this.tabs = Array.from(this.elem.querySelectorAll('blaze-tab'));
  }
  async currentTab() {
    return this.tabs.findIndex((tab) => tab.open);
  }
  async openTab(tabIndex) {
    if (!this.tabs[tabIndex].disabled) {
      this.tabs = this.tabs.map((tab) => {
        tab.open = false;
        return tab;
      });
      this.tabs[tabIndex].open = true;
      this.onTab.emit({ idx: tabIndex });
    }
  }
  render() {
    return (h("div", { class: "c-tabs" },
      h("div", { role: "tablist", class: "c-tabs" },
        h("div", { class: "c-tabs__nav" },
          h("div", { class: "c-tabs__headings" }, this.tabs.map((tab, i) => {
            const openClass = tab.open ? 'c-tab-heading--active' : '';
            const typeClass = tab.type ? `c-tab-heading--${tab.type}` : '';
            return (h("button", { role: "tab", disabled: tab.disabled, class: `c-tab-heading ${typeClass} ${openClass}`, onClick: () => this.openTab(i) }, tab.header));
          }))),
        h("slot", null))));
  }
  static get is() { return "blaze-tabs"; }
  static get states() { return {
    "tabs": {}
  }; }
  static get events() { return [{
      "method": "onTab",
      "name": "tab",
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
  static get methods() { return {
    "currentTab": {
      "complexType": {
        "signature": "() => Promise<number>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<number>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "openTab": {
      "complexType": {
        "signature": "(tabIndex: number) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "elem"; }
}
