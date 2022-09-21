import { EventEmitter } from '../../stencil-public-runtime';
export declare class Counter {
  el: HTMLElement;
  autoStart: boolean;
  startValue: number;
  endValue: number;
  decimals: number;
  duration: number;
  delay: number;
  easing: boolean;
  grouping: boolean;
  separator: string;
  decimal: string;
  onFinish: EventEmitter;
  animation: any;
  timer: any;
  componentDidLoad(): void;
  start(): Promise<void>;
  disconnectedCallback(): void;
  reset(): Promise<void>;
  update(value: number): Promise<void>;
  restart(): Promise<void>;
  pauseResume(): Promise<void>;
  render(): any;
}
