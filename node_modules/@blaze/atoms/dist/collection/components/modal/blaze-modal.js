import { h, Component, Event, Prop, Method, State, Element } from '@stencil/core';
export class Modal {
  constructor() {
    this.ghost = false;
    this.full = false;
    this.open = false;
    this.dismissible = false;
    this._isOpen = false;
  }
  async close() {
    this._isOpen = false;
    this.onClose.emit();
  }
  async show() {
    this._isOpen = true;
  }
  async isOpen() {
    return this._isOpen;
  }
  componentWillLoad() {
    this._isOpen = this.open;
  }
  dismiss() {
    if (this.dismissible)
      this.close();
  }
  render() {
    const ghostClass = this.ghost ? `o-modal--ghost` : '';
    const fullClass = this.full ? `o-modal--full` : '';
    const modalIsOpenClass = this._isOpen ? 'o-modal--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'c-overlay--visible' : '';
    return [
      h("div", { "aria-hidden": true, onClick: () => this.dismiss(), class: `c-overlay c-overlay--fullpage ${overlayIsOpenClass}` }),
      h("div", { role: "dialog", class: `o-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}` },
        this.dismissible && (h("button", { type: "button", class: "c-button c-button--close", onClick: () => this.close() }, "\u00D7")),
        h("slot", null)),
    ];
  }
  static get is() { return "blaze-modal"; }
  static get properties() { return {
    "ghost": {
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
      "attribute": "ghost",
      "reflect": false,
      "defaultValue": "false"
    },
    "full": {
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
      "attribute": "full",
      "reflect": false,
      "defaultValue": "false"
    },
    "open": {
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
      "attribute": "open",
      "reflect": false,
      "defaultValue": "false"
    },
    "dismissible": {
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
      "attribute": "dismissible",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "_isOpen": {}
  }; }
  static get events() { return [{
      "method": "onClose",
      "name": "close",
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
    "close": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
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
    },
    "show": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
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
    },
    "isOpen": {
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
  static get elementRef() { return "elem"; }
}
