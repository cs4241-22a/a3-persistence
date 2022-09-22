import { EventEmitter } from '../../stencil-public-runtime';
export declare class Alert {
  type: string;
  dismissible: boolean;
  open: boolean;
  _isOpen: boolean;
  onClose: EventEmitter;
  close(): Promise<void>;
  show(): Promise<void>;
  isOpen(): Promise<boolean>;
  componentWillLoad(): void;
  render(): any;
}
