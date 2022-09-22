import { EventEmitter } from '../../../stencil-public-runtime';
export declare class ProgressBar {
  type: string;
  value: number;
  min: number;
  max: number;
  duration: number;
  onChanged: EventEmitter;
  watchValue(value: boolean, oldValue: boolean): void;
  render(): any;
}
