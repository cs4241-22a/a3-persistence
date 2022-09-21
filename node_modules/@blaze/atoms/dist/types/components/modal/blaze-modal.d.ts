import { EventEmitter } from '../../stencil-public-runtime';
export declare class Modal {
  elem: HTMLElement;
  ghost: boolean;
  full: boolean;
  open: boolean;
  dismissible: boolean;
  _isOpen: boolean;
  onClose: EventEmitter;
  close(): Promise<void>;
  show(): Promise<void>;
  isOpen(): Promise<boolean>;
  componentWillLoad(): void;
  dismiss(): void;
  render(): any[];
}
