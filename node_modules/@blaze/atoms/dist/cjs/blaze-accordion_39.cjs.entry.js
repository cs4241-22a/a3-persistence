'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9a0c4104.js');

const Accordion = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onToggle = index.createEvent(this, "toggle", 7);
  }
  onTogglePane(ev) {
    const accordion = this.element.children[0];
    const open = ev.detail;
    const pane = ev.target;
    const idx = [].indexOf.call(accordion.children, pane);
    this.onToggle.emit({ idx, open });
  }
  render() {
    return (index.h("div", { class: "c-card c-card--accordion" }, index.h("slot", null)));
  }
  get element() { return index.getElement(this); }
};

const AccordionPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onToggle = index.createEvent(this, "togglepane", 7);
    this._isOpen = false;
    this.open = false;
  }
  componentWillLoad() {
    this._isOpen = this.open;
  }
  async show() {
    this._isOpen = true;
  }
  async close() {
    this._isOpen = false;
  }
  toggle() {
    this._isOpen ? this.close() : this.show();
    this.onToggle.emit(this._isOpen);
  }
  async isOpen() {
    return this._isOpen;
  }
  render() {
    const isOpenClass = this._isOpen ? 'c-card__control--active' : '';
    return [
      index.h("button", { role: "heading", "aria-expanded": this._isOpen.toString(), class: `c-card__control ${isOpenClass}`, onClick: () => this.toggle() }, this.header),
      index.h("section", { "aria-hidden": !this._isOpen, class: "c-card__item c-card__item--pane" }, index.h("slot", null)),
    ];
  }
};

const Address = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("address", { class: "c-address" }, index.h("slot", null)));
  }
};

const AddressHeading = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("span", { class: "c-address__heading" }, index.h("slot", null)));
  }
};

const Alert = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onClose = index.createEvent(this, "close", 7);
    this.type = '';
    this.dismissible = false;
    this.open = false;
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
  render() {
    const isOpenClass = !this._isOpen ? 'u-display-none' : '';
    const typeClass = this.type ? `c-alert--${this.type}` : '';
    return (index.h("div", { role: "alert", hidden: !this._isOpen, class: `c-alert ${typeClass} ${isOpenClass}` }, this.dismissible && (index.h("button", { class: "c-button c-button--close", onClick: () => this.close() }, "\u00D7")), index.h("slot", null)));
  }
};

const Alerts = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const positionClass = this.position ? `c-alerts--${this.position}` : '';
    return (index.h("div", { role: "presentation", class: `c-alerts ${positionClass}` }, index.h("slot", null)));
  }
};

const AutoComplete = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onSelected = index.createEvent(this, "selected", 7);
    this.onFilter = index.createEvent(this, "filter", 7);
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
    return (index.h("div", { class: "o-field o-field--autocomplete" }, index.h("input", { type: "search", class: "c-field", placeholder: this.placeholder, autocomplete: "off", value: this.value, onInput: (e) => this.filter(e), onFocus: () => this.open(), onClick: () => this.open() }), this._isOpen && (index.h("div", { role: "menu", class: "c-card c-card--menu", style: { width: '320px' } }, this.items.map((item) => {
      const isActiveClass = this.activeItem === item ? 'c-card__control--active' : '';
      return (index.h("button", { role: "menuitem", class: `c-card__control ${isActiveClass}`, onClick: () => this.select(item) }, item.text));
    })))));
  }
  get el() { return index.getElement(this); }
};

const Avatar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = '';
  }
  render() {
    if (!this.src && !this.text)
      return;
    const sizeClass = this.size.length > 0 ? `u-${this.size}` : '';
    return (index.h("div", { class: `c-avatar ${sizeClass}`, "data-text": this.text }, this.src && index.h("img", { class: "c-avatar__img", alt: this.alt, src: this.src }), this.src2 && index.h("img", { class: "c-avatar__img", alt: this.alt2, src: this.src2 })));
  }
};

const BackToTop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onBackToTop = index.createEvent(this, "backtotop", 7);
  }
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
    return (index.h("div", { class: `c-back-to-top ${positionCss} ${visibleCss}` }, index.h("button", { class: "c-button c-button--nude", onClick: () => {
        this.goUp();
      } }, index.h("slot", null))));
  }
};

const Badge = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const typeClass = this.type ? `c-badge--${this.type}` : '';
    const roundedClass = this.rounded ? `c-badge--rounded` : '';
    const ghostClass = this.ghost ? `c-badge--ghost` : '';
    return (index.h("span", { class: `c-badge ${typeClass} ${roundedClass} ${ghostClass}` }, index.h("slot", null)));
  }
};

const Calendar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onSelected = index.createEvent(this, "selected", 7);
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
    return (index.h("button", { class: `c-calendar__date ${inMonthClass} c-button ${selectedClass}`, "aria-current": isToday && 'date', "aria-selected": isSelected.toString(), onClick: () => this.selectDate(date) }, date.getDate()));
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
    return (index.h("div", { class: "c-calendar" }, index.h("button", { class: "c-calendar__control c-calendar__control--prev-year", onClick: () => this.navYear(-1) }, "\u2039"), index.h("div", { class: "c-calendar__header c-calendar__header--year" }, this._date.getFullYear()), index.h("button", { class: "c-calendar__control c-calendar__control--next-year", onClick: () => this.navYear(1) }, "\u203A"), index.h("button", { class: "c-calendar__control c-calendar__control--prev-month", onClick: () => this.navMonth(-1) }, "\u2039"), index.h("div", { class: "c-calendar__header c-calendar__header--month" }, this.getMonthName()), index.h("button", { class: "c-calendar__control c-calendar__control--next-month", onClick: () => this.navMonth(1) }, "\u203A"), this.days.map((day) => (index.h("div", { class: "c-calendar__day" }, day))), this.populateDaysPreviousMonth(), this.populateDaysCurrentMonth(), this.populateDaysNextMonth(), index.h("div", { class: "c-calendar__footer" }, index.h("button", { class: `c-calendar__today c-button c-button--block ${this.buttonType}`, onClick: () => this.today() }, "Today"))));
  }
};

const Card = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "c-card" }, index.h("slot", null)));
  }
};

const CardBody = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "c-card__body" }, index.h("slot", null)));
  }
};

const CardFooter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("footer", { class: "c-card__footer" }, index.h("slot", null)));
  }
};

const CardHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("header", { class: "c-card__header" }, index.h("slot", null)));
  }
};

/*

  countUp.js
  by @inorganik

*/
// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)
var CountUp = function (target, startVal, endVal, decimals, duration, options) {
  var self = this;
  self.version = function () {
    return '1.9.3';
  };
  // default options
  self.options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    easingFn: easeOutExpo,
    formattingFn: formatNumber,
    prefix: '',
    suffix: '',
    numerals: [], // optionally pass an array of custom numerals for 0-9
  };
  // extend default options with passed options object
  if (options && typeof options === 'object') {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key];
      }
    }
  }
  if (self.options.separator === '') {
    self.options.useGrouping = false;
  }
  else {
    // ensure the separator is a string (formatNumber assumes this)
    self.options.separator = '' + self.options.separator;
  }
  // make sure requestAnimationFrame and cancelAnimationFrame are defined
  // polyfill for browsers without native support
  // by Opera engineer Erik Möller
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'ms', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
  function formatNumber(num) {
    var neg = num < 0, x, x1, x2, x3, i, len;
    num = Math.abs(num).toFixed(self.decimals);
    num += '';
    x = num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : '';
    if (self.options.useGrouping) {
      x3 = '';
      for (i = 0, len = x1.length; i < len; ++i) {
        if (i !== 0 && i % 3 === 0) {
          x3 = self.options.separator + x3;
        }
        x3 = x1[len - i - 1] + x3;
      }
      x1 = x3;
    }
    // optional numeral substitution
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
      x2 = x2.replace(/[0-9]/g, function (w) {
        return self.options.numerals[+w];
      });
    }
    return (neg ? '-' : '') + self.options.prefix + x1 + x2 + self.options.suffix;
  }
  // Robert Penner's easeOutExpo
  function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  }
  function ensureNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }
  self.initialize = function () {
    if (self.initialized)
      return true;
    self.error = '';
    self.d = typeof target === 'string' ? document.getElementById(target) : target;
    if (!self.d) {
      self.error = '[CountUp] target is null or undefined';
      return false;
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    // error checks
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = self.startVal > self.endVal;
      self.frameVal = self.startVal;
      self.initialized = true;
      return true;
    }
    else {
      self.error = '[CountUp] startVal (' + startVal + ') or endVal (' + endVal + ') is not a number';
      return false;
    }
  };
  // Print value to target
  self.printValue = function (value) {
    var result = self.options.formattingFn(value);
    if (self.d.tagName === 'INPUT') {
      this.d.value = result;
    }
    else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
      this.d.textContent = result;
    }
    else {
      this.d.innerHTML = result;
    }
  };
  self.count = function (timestamp) {
    if (!self.startTime) {
      self.startTime = timestamp;
    }
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;
    // to ease or not to ease
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
      }
      else {
        self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
      }
    }
    else {
      if (self.countDown) {
        self.frameVal = self.startVal - (self.startVal - self.endVal) * (progress / self.duration);
      }
      else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
      }
    }
    // don't go past endVal since progress can exceed duration in the last frame
    if (self.countDown) {
      self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
    }
    else {
      self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
    }
    // decimal
    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;
    // format and print value
    self.printValue(self.frameVal);
    // whether to continue
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    }
    else {
      if (self.callback)
        self.callback();
    }
  };
  // start your animation
  self.start = function (callback) {
    if (!self.initialize())
      return;
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count);
  };
  // toggles pause/resume animation
  self.pauseResume = function () {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF);
    }
    else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    }
  };
  // reset to startVal so animation can be run again
  self.reset = function () {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal);
    }
  };
  // pass a new endVal and start animation
  self.update = function (newEndVal) {
    if (!self.initialize())
      return;
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error = '[CountUp] update() - new endVal is not a number: ' + newEndVal;
      return;
    }
    self.error = '';
    if (newEndVal === self.frameVal)
      return;
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = self.startVal > self.endVal;
    self.rAF = requestAnimationFrame(self.count);
  };
  // format startVal on initialization
  if (self.initialize())
    self.printValue(self.startVal);
};

const Counter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onFinish = index.createEvent(this, "finish", 7);
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
    return (index.h("div", { class: "c-counter" }, index.h("span", { class: "c-counter__prefix" }, index.h("slot", { name: "prefix" })), index.h("span", { class: "c-counter__amount" }), index.h("span", { class: "c-counter__suffix" }, index.h("slot", { name: "suffix" }))));
  }
  get el() { return index.getElement(this); }
};

const Demo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.classes = '';
    this.language = '';
    this.demo = true;
  }
  componentWillLoad() {
    this.markup = this.code;
  }
  updateDemo(e) {
    this.markup = e.target.innerText;
  }
  highlight() {
    if (typeof hljs !== 'undefined') {
      hljs.highlightElement(this.codeRef);
    }
  }
  componentDidUpdate() {
    this.highlight();
  }
  componentDidLoad() {
    this.highlight();
  }
  render() {
    return [
      this.demo && (index.h("div", { "aria-label": "Demo component", class: `demo-markup-source u-letter-box-small ${this.classes}`, innerHTML: this.markup })),
      index.h("div", { class: "u-letter-box-small" }, index.h("pre", { class: "u-pre" }, index.h("code", { ref: (ref) => (this.codeRef = ref), "aria-hidden": true, tabindex: "-1", class: `u-code u-code--multiline ${this.language}`, contenteditable: this.demo, onBlur: (e) => this.updateDemo(e) }, this.markup))),
    ];
  }
};

const Divider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'solid';
  }
  componentWillLoad() {
    this.content = !!this.el.innerHTML;
  }
  render() {
    const typeClass = this.type ? `c-divider--${this.type}` : '';
    return (index.h("div", { class: `c-divider ${typeClass}` }, this.content && (index.h("span", { class: "c-divider__content" }, index.h("slot", null)))));
  }
  get el() { return index.getElement(this); }
};

const Drawer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onClose = index.createEvent(this, "close", 7);
    this.open = false;
    this.dismissible = false;
    this.position = 'bottom';
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
    const drawerIsOpenClass = this._isOpen ? 'o-drawer--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'c-overlay--visible' : '';
    return [
      index.h("div", { "aria-hidden": "true", onClick: () => this.dismiss(), class: `c-overlay c-overlay--fullpage ${overlayIsOpenClass}` }),
      index.h("aside", { "aria-expanded": this.isOpen.toString(), class: `o-drawer o-drawer--${this.position} ${drawerIsOpenClass}` }, index.h("slot", null)),
    ];
  }
};

const FileUpload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onUploaded = index.createEvent(this, "uploaded", 7);
    this.onUploading = index.createEvent(this, "uploading", 7);
    this.url = '/';
    this.files = [];
  }
  async uploadFiles(e) {
    this.files = Array.from(e.target.files);
    if (this.drop) {
      try {
        this.onUploading.emit({ files: this.files });
        await Promise.all(this.files.map((file) => fetch(this.url, {
          method: 'POST',
          body: file,
        })));
        this.onUploaded.emit({ upload: true, files: this.files });
      }
      catch (error) {
        this.onUploaded.emit({ upload: false, error });
      }
    }
  }
  renderLabel() {
    if (!this.drop && this.files.length > 0) {
      if (this.multiple)
        return index.h("span", null, this.files.length, " files");
      return index.h("span", null, this.files[0].name);
    }
  }
  render() {
    const dropClass = this.drop ? 'c-file-upload--drop' : '';
    return (index.h("div", { class: `c-file-upload ${dropClass}` }, index.h("slot", null), this.renderLabel(), index.h("input", { type: "file", multiple: this.multiple, onChange: (e) => this.uploadFiles(e) })));
  }
};

const Image = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.filter = ''; // filter based on search term
  }
  generateSrc() {
    if (this.src)
      return this.src;
    let size = '';
    if (this.width && this.height) {
      size = `${this.width}x${this.height}/`;
    }
    let filter = '';
    if (this.filter) {
      filter = `?${this.filter}`;
    }
    if (this.photo) {
      return `https://source.unsplash.com/${this.photo}/${size}`;
    }
    if (this.user) {
      return this.likes
        ? `https://source.unsplash.com/user/${this.user}/likes/${size}${filter}`
        : `https://source.unsplash.com/user/${this.user}/${size}${filter}`;
    }
    if (this.collection) {
      return `https://source.unsplash.com/collection/${this.collection}/${size}${filter}`;
    }
    return `https://source.unsplash.com/random/${size}${filter}`;
  }
  componentDidLoad() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          this.loadImage();
          this.cleanup();
        }
      });
      this.io.observe(this.el);
    }
    else {
      this.loadImage();
    }
  }
  disconnectedCallback() {
    this.cleanup();
  }
  loadImage() {
    this._src = this.generateSrc();
  }
  cleanup() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }
  render() {
    return index.h("img", { class: "o-image", src: this._src, alt: this.alt });
  }
  get el() { return index.getElement(this); }
};

const MediaBody = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "o-media__body" }, index.h("slot", null)));
  }
};

const MediaImage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "o-media__image" }, index.h("img", { class: "o-image", alt: this.alt, src: this.src })));
  }
};

const MediaItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "c-card__item o-media" }, index.h("slot", null)));
  }
};

const Modal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onClose = index.createEvent(this, "close", 7);
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
      index.h("div", { "aria-hidden": true, onClick: () => this.dismiss(), class: `c-overlay c-overlay--fullpage ${overlayIsOpenClass}` }),
      index.h("div", { role: "dialog", class: `o-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}` }, this.dismissible && (index.h("button", { type: "button", class: "c-button c-button--close", onClick: () => this.close() }, "\u00D7")), index.h("slot", null)),
    ];
  }
  get elem() { return index.getElement(this); }
};

const Pagination = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onPage = index.createEvent(this, "page", 7);
    this.page = 1;
    this.pages = 1;
  }
  async goToPage(page) {
    if (page > 0 && page <= this.pages) {
      this._currentPage = page;
      this.onPage.emit(this._currentPage);
    }
  }
  async currentPage() {
    return this._currentPage;
  }
  componentWillLoad() {
    this._currentPage = this.page;
  }
  render() {
    return (index.h("nav", { class: "c-pagination" }, index.h("button", { class: "c-pagination__control", onClick: () => this.goToPage(this._currentPage - 1), disabled: this._currentPage === 1 }, "\u2039"), index.h("div", { class: "c-pagination__pages" }, this._currentPage > 1 && (index.h("button", { onClick: () => this.goToPage(this._currentPage - 1), class: "c-pagination__control" }, this._currentPage - 1)), index.h("button", { class: "c-pagination__control", "aria-current": true }, this._currentPage), this._currentPage < this.pages && (index.h("button", { onClick: () => this.goToPage(this._currentPage + 1), class: "c-pagination__control" }, this._currentPage + 1))), index.h("button", { class: "c-pagination__control", onClick: () => this.goToPage(this._currentPage + 1), disabled: this._currentPage === this.pages }, "\u203A")));
  }
};

const Panel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.height = 0;
  }
  render() {
    return (index.h("div", { class: "o-panel-container", style: { height: `${this.height}px` } }, index.h("div", { class: "o-panel" }, index.h("slot", null))));
  }
};

const Progress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChanged = index.createEvent(this, "changed", 7);
  }
  onChangeBar(ev) {
    const progress = this.element.children[0];
    const value = ev.detail;
    const bar = ev.target;
    const idx = [].indexOf.call(progress.children, bar);
    this.onChanged.emit(Object.assign({ idx }, value));
  }
  render() {
    const sizeClass = this.size ? `u-${this.size}` : '';
    const roundedClass = this.rounded ? `c-progress--rounded` : '';
    const timerClass = this.timer ? `c-progress--timer` : '';
    return (index.h("div", { class: `c-progress ${roundedClass} ${timerClass} ${sizeClass}` }, index.h("slot", null)));
  }
  get element() { return index.getElement(this); }
};

const ProgressBar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChanged = index.createEvent(this, "progressbar", 7);
    this.min = 0;
    this.max = 100;
    this.duration = 0;
  }
  watchValue(value, oldValue) {
    this.onChanged.emit({ value, oldValue });
  }
  render() {
    const typeClass = this.type ? `c-progress__bar--${this.type}` : '';
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    const timerAnimationDuration = this.duration ? { animationDuration: `${this.duration}s` } : {};
    return (index.h("div", { role: "progressbar", "aria-valuenow": this.value, "aria-valuemin": this.min, "aria-valuemax": this.max, style: Object.assign({ width: `${percentage}%` }, timerAnimationDuration), class: `c-progress__bar ${typeClass}` }, index.h("slot", null)));
  }
  static get watchers() { return {
    "value": ["watchValue"]
  }; }
};

const Sticky = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.top = 0;
  }
  componentWillUpdate() {
    this.positionElement();
  }
  positionElement() {
    this.dimensions = this.elem.children[0].getBoundingClientRect();
    this.offsetTop = this.dimensions.top + window.scrollY;
    if (this.offsetTop - window.scrollY - this.top <= 0) {
      this.staticStyles = {
        width: `${this.dimensions.width}px`,
        height: `${this.dimensions.height}px`,
      };
      this.stickyStyles = {
        position: 'fixed',
        top: `${this.top}px`,
        left: `${this.dimensions.left}px`,
        width: `${this.dimensions.width}px`,
      };
    }
    else {
      this.staticStyles = {};
      this.stickyStyles = {};
    }
  }
  render() {
    return (index.h("div", { style: this.staticStyles }, index.h("div", { style: this.stickyStyles }, index.h("slot", null))));
  }
  get elem() { return index.getElement(this); }
};

const Tab = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const typeClass = this.type ? `c-tabs__tab--${this.type}` : '';
    return (index.h("div", { role: "tabpanel", hidden: !this.open, class: `c-tabs__tab ${typeClass}` }, index.h("slot", null)));
  }
};

const Tabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onTab = index.createEvent(this, "tab", 7);
  }
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
    return (index.h("div", { class: "c-tabs" }, index.h("div", { role: "tablist", class: "c-tabs" }, index.h("div", { class: "c-tabs__nav" }, index.h("div", { class: "c-tabs__headings" }, this.tabs.map((tab, i) => {
      const openClass = tab.open ? 'c-tab-heading--active' : '';
      const typeClass = tab.type ? `c-tab-heading--${tab.type}` : '';
      return (index.h("button", { role: "tab", disabled: tab.disabled, class: `c-tab-heading ${typeClass} ${openClass}`, onClick: () => this.openTab(i) }, tab.header));
    }))), index.h("slot", null))));
  }
  get elem() { return index.getElement(this); }
};

const Tags = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onAdd = index.createEvent(this, "add", 7);
    this.onFilter = index.createEvent(this, "filter", 7);
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
    return (index.h("blaze-autocomplete", { ref: (ref) => (this.autocompleteRef = ref), onFilter: (e) => this.filter(e), placeholder: this._placeholder, onSelected: (e) => this.select(e) }));
  }
  renderDropdown() {
    return (index.h("select", { class: "c-field", onChange: (e) => this.select(e) }, index.h("option", { ref: (ref) => (this.optionRef = ref) }, this._placeholder), this._options.map((option) => (index.h("option", { value: option.value }, option.text)))));
  }
  renderInput() {
    return (index.h("input", { type: "text", class: "c-field", placeholder: this._placeholder, value: this.inputValue, onInput: (e) => this.handleInput(e), onKeyDown: (e) => this.handleEnter(e) }));
  }
  renderField() {
    if (this.autocomplete)
      return this.renderAutocomplete();
    if (this.options)
      return this.renderDropdown();
    return this.renderInput();
  }
  render() {
    return (index.h("div", { class: "c-tags" }, index.h("div", { class: "c-tags__container" }, this.choices.map((choice, i) => (index.h("button", { type: "button", class: "c-button c-tag", onClick: () => this.removeChoice(i) }, choice.text)))), index.h("div", { class: "c-tags__field-container" }, this.renderField())));
  }
};

const Timeline = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const alternateClass = this.alternate ? 'o-timeline--alternate' : '';
    const loadingClass = this.loading ? 'o-timeline--loading' : '';
    return (index.h("ol", { class: `o-timeline ${alternateClass} ${loadingClass}` }, index.h("slot", null)));
  }
};

const TimelineItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const typeClass = this.type ? `c-timeline-item--${this.type}` : '';
    const lastClass = this.last ? `c-timeline-item--last` : '';
    const leftClass = this.left ? `c-timeline-item--left` : '';
    const loadingClass = this.loading && !this.last ? `c-timeline-item--loading` : '';
    return (index.h("li", { class: `c-timeline-item ${typeClass} ${leftClass} ${lastClass} ${loadingClass}` }, index.h("div", { class: "c-timeline-item__body" }, index.h("slot", null))));
  }
};

const Toggle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onToggle = index.createEvent(this, "toggle", 7);
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
    return (index.h("label", { class: `c-toggle ${type}`, onClick: (e) => this.handleToggle(e) }, index.h("input", { type: "checkbox", "aria-checked": this._toggled.toString(), checked: this._toggled }), index.h("div", { class: "c-toggle__track" }, index.h("div", { class: "c-toggle__handle" })), index.h("slot", null)));
  }
  static get watchers() { return {
    "toggled": ["toggle"]
  }; }
};

const Tree = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { role: "tree", class: "c-tree" }, index.h("slot", null)));
  }
};

const TreeBranch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onExpand = index.createEvent(this, "expand", 7);
    this.onCollapse = index.createEvent(this, "collapse", 7);
    this.expanded = false;
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
    if (this.expanded)
      this.onExpand.emit();
    else
      this.onCollapse.emit();
  }
  async expand() {
    this.expanded = true;
  }
  async collapse() {
    this.expanded = false;
  }
  render() {
    return [
      index.h("button", { role: "treeitem", "aria-expanded": this.expanded.toString(), class: "c-tree__item", onClick: () => this.toggleExpanded() }, index.h("slot", { name: "branch" })),
      index.h("div", { role: "tree", class: "c-tree" }, index.h("slot", { name: "leaf" })),
    ];
  }
};

const TreeLeaf = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("span", { role: "treeitem", class: "c-tree__item" }, index.h("slot", null)));
  }
};

exports.blaze_accordion = Accordion;
exports.blaze_accordion_pane = AccordionPane;
exports.blaze_address = Address;
exports.blaze_address_heading = AddressHeading;
exports.blaze_alert = Alert;
exports.blaze_alerts = Alerts;
exports.blaze_autocomplete = AutoComplete;
exports.blaze_avatar = Avatar;
exports.blaze_back_to_top = BackToTop;
exports.blaze_badge = Badge;
exports.blaze_calendar = Calendar;
exports.blaze_card = Card;
exports.blaze_card_body = CardBody;
exports.blaze_card_footer = CardFooter;
exports.blaze_card_header = CardHeader;
exports.blaze_counter = Counter;
exports.blaze_demo = Demo;
exports.blaze_divider = Divider;
exports.blaze_drawer = Drawer;
exports.blaze_file_upload = FileUpload;
exports.blaze_image = Image;
exports.blaze_media_body = MediaBody;
exports.blaze_media_image = MediaImage;
exports.blaze_media_item = MediaItem;
exports.blaze_modal = Modal;
exports.blaze_pagination = Pagination;
exports.blaze_panel = Panel;
exports.blaze_progress = Progress;
exports.blaze_progress_bar = ProgressBar;
exports.blaze_sticky = Sticky;
exports.blaze_tab = Tab;
exports.blaze_tabs = Tabs;
exports.blaze_tags = Tags;
exports.blaze_timeline = Timeline;
exports.blaze_timeline_item = TimelineItem;
exports.blaze_toggle = Toggle;
exports.blaze_tree = Tree;
exports.blaze_tree_branch = TreeBranch;
exports.blaze_tree_leaf = TreeLeaf;
