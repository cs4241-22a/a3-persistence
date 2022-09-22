import { h, Component, Event, Listen, State, Prop } from '@stencil/core';
export class BackToTop {
  enable() {
    this._isOpen = window.scrollY > window.innerHeight;
  }
  goUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.onBackToTop.emit();
  }
  render() {
    const visibleCss = !this._isOpen ? 'u-display-none' : '';
    const positionCss = this.position ? `c-back-to-top--${this.position}` : '';
    return (h("div", { class: `c-back-to-top ${positionCss} ${visibleCss}` },
      h("button", { class: "c-button c-button--nude", onClick: () => {
          this.goUp();
        } },
        h("slot", null))));
  }
  static get is() { return "blaze-back-to-top"; }
  static get properties() { return {
    "position": {
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
      "attribute": "position",
      "reflect": false
    }
  }; }
  static get states() { return {
    "_isOpen": {}
  }; }
  static get events() { return [{
      "method": "onBackToTop",
      "name": "backtotop",
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
  static get listeners() { return [{
      "name": "scroll",
      "method": "enable",
      "target": "document",
      "capture": false,
      "passive": true
    }]; }
}
