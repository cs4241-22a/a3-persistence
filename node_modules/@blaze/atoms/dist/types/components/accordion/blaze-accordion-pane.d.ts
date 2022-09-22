import { EventEmitter } from '../../stencil-public-runtime';
export declare class AccordionPane {
  _isOpen: boolean;
  open: boolean;
  header: string;
  onToggle: EventEmitter;
  componentWillLoad(): void;
  show(): Promise<void>;
  close(): Promise<void>;
  toggle(): void;
  isOpen(): Promise<boolean>;
  render(): any[];
}
