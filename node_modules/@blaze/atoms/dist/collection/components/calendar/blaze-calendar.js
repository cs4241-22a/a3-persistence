import { h, Component, Prop, State, Event } from '@stencil/core';
export class Calendar {
  constructor() {
    this.multiple = false;
    this._date = new Date();
    this._selectedDates = [];
    this.days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.buttonType = '';
  }
  componentWillLoad() {
    const date = this.date || new Date();
    this._date = new Date(date);
    this._selectedDates = [...this._selectedDates, this._date];
    this.buttonType = this.type ? `c-button--${this.type}` : '';
  }
  getMonthName() {
    return this.months[this._date.getMonth()];
  }
  getFirstDay() {
    return new Date(this._date.getFullYear(), this._date.getMonth(), 1).getDay();
  }
  getLastDay() {
    return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDay();
  }
  getTotalDaysInMonth(diff = 0) {
    return new Date(this._date.getFullYear(), this._date.getMonth() + 1 + diff, 0).getDate();
  }
  selectDate(date) {
    if (this._selectedDates.filter((d) => d.toDateString() === date.toDateString()).length) {
      // If date already selected remove it
      this._selectedDates = this._selectedDates.filter((d) => d.toDateString() !== date.toDateString());
    }
    else {
      // otherwise add it
      if (this.multiple) {
        this._selectedDates = [...this._selectedDates, date];
      }
      else {
        this._selectedDates = [date];
      }
    }
    this.onSelected.emit(this._selectedDates.map((d) => d.toDateString()).toString());
  }
  renderDayButton(date) {
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = !!this._selectedDates.filter((d) => d.toDateString() === date.toDateString()).length;
    const inMonthClass = date.getMonth() === this._date.getMonth() ? 'c-calendar__date--in-month' : '';
    const selectedClass = isSelected ? `c-calendar__date--selected ${this.buttonType}` : '';
    return (h("button", { class: `c-calendar__date ${inMonthClass} c-button ${selectedClass}`, "aria-current": isToday && 'date', "aria-selected": isSelected.toString(), onClick: () => this.selectDate(date) }, date.getDate()));
  }
  populateDaysPreviousMonth() {
    const days = [];
    const totalDaysInPreviousMonth = this.getTotalDaysInMonth(-1);
    for (let i = totalDaysInPreviousMonth; i > totalDaysInPreviousMonth - this.getFirstDay(); i--) {
      const date = new Date(this._date);
      date.setMonth(this._date.getMonth() - 1);
      date.setDate(i);
      const day = new Date(date);
      days.unshift(this.renderDayButton(day));
    }
    return days;
  }
  populateDaysCurrentMonth() {
    const days = [];
    const totalDaysInMonth = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(this._date);
      date.setDate(i);
      const day = new Date(date);
      days.push(this.renderDayButton(day));
    }
    return days;
  }
  populateDaysNextMonth() {
    const days = [];
    for (let i = 1; i < 7 - this.getLastDay(); i++) {
      const date = new Date(this._date);
      date.setDate(i);
      date.setMonth(this._date.getMonth() + 1);
      const day = new Date(date);
      days.push(this.renderDayButton(day));
    }
    return days;
  }
  navYear(diff) {
    const date = new Date(this._date);
    date.setFullYear(this._date.getFullYear() + diff);
    this._date = new Date(date);
  }
  navMonth(diff) {
    const date = new Date(this._date);
    date.setMonth(this._date.getMonth() + diff);
    this._date = new Date(date);
  }
  today() {
    this.selectDate(new Date());
    this._date = new Date();
  }
  render() {
    return (h("div", { class: "c-calendar" },
      h("button", { class: "c-calendar__control c-calendar__control--prev-year", onClick: () => this.navYear(-1) }, "\u2039"),
      h("div", { class: "c-calendar__header c-calendar__header--year" }, this._date.getFullYear()),
      h("button", { class: "c-calendar__control c-calendar__control--next-year", onClick: () => this.navYear(1) }, "\u203A"),
      h("button", { class: "c-calendar__control c-calendar__control--prev-month", onClick: () => this.navMonth(-1) }, "\u2039"),
      h("div", { class: "c-calendar__header c-calendar__header--month" }, this.getMonthName()),
      h("button", { class: "c-calendar__control c-calendar__control--next-month", onClick: () => this.navMonth(1) }, "\u203A"),
      this.days.map((day) => (h("div", { class: "c-calendar__day" }, day))),
      this.populateDaysPreviousMonth(),
      this.populateDaysCurrentMonth(),
      this.populateDaysNextMonth(),
      h("div", { class: "c-calendar__footer" },
        h("button", { class: `c-calendar__today c-button c-button--block ${this.buttonType}`, onClick: () => this.today() }, "Today"))));
  }
  static get is() { return "blaze-calendar"; }
  static get properties() { return {
    "date": {
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
      "attribute": "date",
      "reflect": false
    },
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
    "multiple": {
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
      "attribute": "multiple",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "_date": {},
    "_selectedDates": {}
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
    }]; }
}
