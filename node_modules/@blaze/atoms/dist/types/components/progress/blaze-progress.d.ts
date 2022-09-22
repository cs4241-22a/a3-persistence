import { EventEmitter } from '../../stencil-public-runtime';
export declare class Progress {
  private element;
  rounded: boolean;
  timer: boolean;
  size: string;
  onChanged: EventEmitter;
  onChangeBar(ev: any): void;
  render(): any;
}
