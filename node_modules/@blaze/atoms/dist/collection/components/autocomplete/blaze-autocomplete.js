import { h, Component, Event, Prop, Method, State, Listen, Element } from '@stencil/core';
export class AutoComplete {
  constructor() {
    this.items = [];
  }
  componentDidLoad() {
    document.addEventListener('click', (e) => {
      e.target !== this.el && !this.el.contains(e.target) && this.close();
    });
  }
  async setItems(items) {
    this.items = items;
    this.value ? this.open() : this.close();
  }
  async reset() {
    this.items = [];
    this.value = null;
    this.close();
  }
  select(item) {
    if (item.disabled)
      return;
    this.activeItem = item;
    this.selectedItem = item;
    this.value = item.text;
    this.onSelected.emit(item);
    this.close();
  }
  filter(e) {
    this.activeItem = null;
    this.value = e.target.value;
    const query = this.value;
    this.onFilter.emit(query);
  }
  open() {
    if (this.items && this.items.length) {
      this._isOpen = true;
    }
  }
  close() {
    this._isOpen = false;
  }
  handleKeyDown(ev) {
    let idx = this.items.indexOf(this.activeItem);
    switch (ev.key) {
      case 'ArrowDown': {
        ev.preventDefault();
        this.open();
        if (idx < this.items.length - 1) {
          this.activeItem = this.items[idx + 1];
        }
        break;
      }
      case 'ArrowUp': {
        ev.preventDefault();
        this.open();
        if (idx > 0 && this._isOpen) {
          this.activeItem = this.items[idx - 1];
        }
        break;
      }
      case 'Enter': {
        if (this.activeItem) {
          ev.preventDefault();
          this.select(this.activeItem);
        }
      }
      case 'Escape': {
        this.close();
      }
    }
  }
  render() {
    return (h("div", { class: "o-field o-field--autocomplete" },
      h("input", { type: "search", class: "c-field", placeholder: this.placeholder, autocomplete: "off", value: this.value, onInput: (e) => this.filter(e), onFocus: () => this.open(), onClick: () => this.open() }),
      this._isOpen && (h("div", { role: "menu", class: "c-card c-card--menu", style: { width: '320px' } }, this.items.map((item) => {
        const isActiveClass = this.activeItem === item ? 'c-card__control--active' : '';
        return (h("button", { role: "menuitem", class: `c-card__control ${isActiveClass}`, onClick: () => this.select(item) }, item.text));
      })))));
  }
  static get is() { return "blaze-autocomplete"; }
  static get properties() { return {
    "placeholder": {
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
      "attribute": "placeholder",
      "reflect": false
    }
  }; }
  static get states() { return {
    "items": {},
    "selectedItem": {},
    "activeItem": {},
    "_isOpen": {},
    "value": {}
  }; }
  static get events() { return [{
      "method": "onSelected",
      "name": "selected",
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
    }, {
      "method": "onFilter",
      "name": "filter",
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
    "setItems": {
      "complexType": {
        "signature": "(items: Array<IAutoCompleteItem>) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "Array": {
            "location": "global"
          },
          "IAutoCompleteItem": {
            "location": "import",
            "path": "./interfaces"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "reset": {
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
    }
  }; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "handleKeyDown",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
