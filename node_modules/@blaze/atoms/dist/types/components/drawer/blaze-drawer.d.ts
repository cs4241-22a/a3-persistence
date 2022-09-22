import { EventEmitter } from '../../stencil-public-runtime';
export declare class Drawer {
  open: boolean;
  dismissible: boolean;
  position: string;
  _isOpen: boolean;
  onClose: EventEmitter;
  close(): Promise<void>;
  show(): Promise<void>;
  isOpen(): Promise<boolean>;
  componentWillLoad(): void;
  dismiss(): void;
  render(): any[];
}
