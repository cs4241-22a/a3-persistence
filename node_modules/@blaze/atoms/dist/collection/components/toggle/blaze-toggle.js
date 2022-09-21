import { h, Component, Event, Method, Prop, State, Watch } from '@stencil/core';
export class Toggle {
  constructor() {
    this.toggled = false;
    this._toggled = false;
  }
  componentWillLoad() {
    this._toggled = this.toggled;
  }
  async isToggled() {
    return this._toggled;
  }
  toggle() {
    this._toggled = !this._toggled;
  }
  handleToggle(e) {
    e.preventDefault();
    this.toggle();
    this.onToggle.emit(this._toggled);
  }
  render() {
    const type = this.type ? `c-toggle--${this.type}` : '';
    return (h("label", { class: `c-toggle ${type}`, onClick: (e) => this.handleToggle(e) },
      h("input", { type: "checkbox", "aria-checked": this._toggled.toString(), checked: this._toggled }),
      h("div", { class: "c-toggle__track" },
        h("div", { class: "c-toggle__handle" })),
      h("slot", null)));
  }
  static get is() { return "blaze-toggle"; }
  static get properties() { return {
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "type",
      "reflect": false
    },
    "toggled": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "toggled",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "_toggled": {}
  }; }
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
  static get methods() { return {
    "isToggled": {
      "complexType": {
        "signature": "() => Promise<boolean>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get watchers() { return [{
      "propName": "toggled",
      "methodName": "toggle"
    }]; }
}
