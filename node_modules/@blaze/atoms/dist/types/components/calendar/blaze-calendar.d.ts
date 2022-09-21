/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Calendar {
  date: string;
  type: string;
  multiple: boolean;
  _date: Date;
  _selectedDates: Array<Date>;
  onSelected: EventEmitter;
  days: Array<string>;
  months: Array<string>;
  buttonType: string;
  componentWillLoad(): void;
  getMonthName(): string;
  getFirstDay(): number;
  getLastDay(): number;
  getTotalDaysInMonth(diff?: number): number;
  selectDate(date: any): void;
  renderDayButton(date: Date): any;
  populateDaysPreviousMonth(): object[];
  populateDaysCurrentMonth(): object[];
  populateDaysNextMonth(): object[];
  navYear(diff: any): void;
  navMonth(diff: any): void;
  today(): void;
  render(): any;
}
