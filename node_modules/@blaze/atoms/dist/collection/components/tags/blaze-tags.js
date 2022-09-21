import { h, Component, Event, Prop, State, Method } from '@stencil/core';
export class Tags {
  constructor() {
    this.choices = [];
    this.inputValue = '';
  }
  async setOptions(options) {
    if (options)
      this._options = options;
    else if (this.options)
      this._options = JSON.parse(this.options);
    if (this.autocompleteRef) {
      return this.autocompleteRef.setItems(this._options);
    }
  }
  componentWillLoad() {
    this.setOptions();
    this._placeholder = this.placeholder;
    if (!this._placeholder)
      this._placeholder = this.options ? 'Select an option' : 'Add a tag';
  }
  addChoice(choice) {
    this.choices = [...this.choices, choice];
    this.onAdd.emit(choice);
    if (this.optionRef)
      this.optionRef.selected = true;
    this.inputValue = '';
  }
  select(e) {
    e.preventDefault();
    const chosenValue = e.target.value || e.detail.value;
    if (typeof chosenValue === 'undefined')
      return;
    // Get selected option based on selected value
    const choice = this._options.find((o) => o.value === chosenValue);
    if (choice) {
      this.addChoice(choice);
    }
    if (this.autocompleteRef)
      this.autocompleteRef.reset();
  }
  handleInput(e) {
    this.inputValue = e.target.value;
  }
  handleEnter(e) {
    if (e.key === 'Enter' && this.inputValue) {
      e.preventDefault();
      const choice = { text: this.inputValue };
      this.addChoice(choice);
    }
  }
  removeChoice(i) {
    this.choices.splice(i, 1);
    this.choices = [...this.choices];
  }
  filter(e) {
    // e.stopPropagation();
    this.onFilter.emit(e.detail);
  }
  renderAutocomplete() {
    return (h("blaze-autocomplete", { ref: (ref) => (this.autocompleteRef = ref), onFilter: (e) => this.filter(e), placeholder: this._placeholder, onSelected: (e) => this.select(e) }));
  }
  renderDropdown() {
    return (h("select", { class: "c-field", onChange: (e) => this.select(e) },
      h("option", { ref: (ref) => (this.optionRef = ref) }, this._placeholder),
      this._options.map((option) => (h("option", { value: option.value }, option.text)))));
  }
  renderInput() {
    return (h("input", { type: "text", class: "c-field", placeholder: this._placeholder, value: this.inputValue, onInput: (e) => this.handleInput(e), onKeyDown: (e) => this.handleEnter(e) }));
  }
  renderField() {
    if (this.autocomplete)
      return this.renderAutocomplete();
    if (this.options)
      return this.renderDropdown();
    return this.renderInput();
  }
  render() {
    return (h("div", { class: "c-tags" },
      h("div", { class: "c-tags__container" }, this.choices.map((choice, i) => (h("button", { type: "button", class: "c-button c-tag", onClick: () => this.removeChoice(i) }, choice.text)))),
      h("div", { class: "c-tags__field-container" }, this.renderField())));
  }
  static get is() { return "blaze-tags"; }
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
    },
    "autocomplete": {
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
      "attribute": "autocomplete",
      "reflect": false
    },
    "options": {
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
      "attribute": "options",
      "reflect": false
    }
  }; }
  static get states() { return {
    "_placeholder": {},
    "_options": {},
    "choices": {},
    "inputValue": {}
  }; }
  static get events() { return [{
      "method": "onAdd",
      "name": "add",
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
    "setOptions": {
      "complexType": {
        "signature": "(options?: Array<IOption>) => Promise<any>",
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
          "IOption": {
            "location": "import",
            "path": "./interfaces"
          }
        },
        "return": "Promise<any>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
}
