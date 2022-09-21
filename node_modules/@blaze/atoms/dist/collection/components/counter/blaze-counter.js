import { h, Component, Element, Event, Prop, Method } from '@stencil/core';
import CountUp from './CountUp';
export class Counter {
  constructor() {
    this.startValue = 0;
    this.decimals = 0;
    this.duration = 4;
    this.delay = 500;
    this.easing = true;
    this.grouping = true;
    this.separator = ',';
    this.decimal = '.';
  }
  componentDidLoad() {
    const target = this.el.querySelector('.c-counter__amount');
    this.animation = new CountUp(target, this.startValue, this.endValue, this.decimals, this.duration, {
      useEasing: this.easing,
      useGrouping: this.grouping,
      separator: this.separator,
      decimal: this.decimal,
    });
    if (this.autoStart) {
      this.start();
    }
  }
  async start() {
    this.timer = setTimeout(() => {
      this.animation.start(() => {
        this.onFinish.emit();
      });
    }, this.delay);
  }
  disconnectedCallback() {
    clearTimeout(this.timer);
  }
  async reset() {
    this.animation.reset();
  }
  async update(value) {
    this.animation.update(value);
  }
  async restart() {
    this.animation.reset();
    this.animation.start();
  }
  async pauseResume() {
    this.animation.pauseResume();
  }
  render() {
    return (h("div", { class: "c-counter" },
      h("span", { class: "c-counter__prefix" },
        h("slot", { name: "prefix" })),
      h("span", { class: "c-counter__amount" }),
      h("span", { class: "c-counter__suffix" },
        h("slot", { name: "suffix" }))));
  }
  static get is() { return "blaze-counter"; }
  static get properties() { return {
    "autoStart": {
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
      "attribute": "auto-start",
      "reflect": false
    },
    "startValue": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "start-value",
      "reflect": false,
      "defaultValue": "0"
    },
    "endValue": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "end-value",
      "reflect": false
    },
    "decimals": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "decimals",
      "reflect": false,
      "defaultValue": "0"
    },
    "duration": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "duration",
      "reflect": false,
      "defaultValue": "4"
    },
    "delay": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "delay",
      "reflect": false,
      "defaultValue": "500"
    },
    "easing": {
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
      "attribute": "easing",
      "reflect": false,
      "defaultValue": "true"
    },
    "grouping": {
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
      "attribute": "grouping",
      "reflect": false,
      "defaultValue": "true"
    },
    "separator": {
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
      "attribute": "separator",
      "reflect": false,
      "defaultValue": "','"
    },
    "decimal": {
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
      "attribute": "decimal",
      "reflect": false,
      "defaultValue": "'.'"
    }
  }; }
  static get events() { return [{
      "method": "onFinish",
      "name": "finish",
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
    "start": {
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
    },
    "update": {
      "complexType": {
        "signature": "(value: number) => Promise<void>",
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
    },
    "restart": {
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
    "pauseResume": {
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
}
