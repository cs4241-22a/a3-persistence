import { EventEmitter } from '../../stencil-public-runtime';
import { IAutoCompleteItem } from './interfaces';
export declare class AutoComplete {
  el: HTMLDivElement;
  placeholder: string;
  onSelected: EventEmitter;
  onFilter: EventEmitter;
  items: Array<IAutoCompleteItem>;
  selectedItem: IAutoCompleteItem;
  activeItem: IAutoCompleteItem;
  _isOpen: boolean;
  value: string;
  componentDidLoad(): void;
  setItems(items: Array<IAutoCompleteItem>): Promise<void>;
  reset(): Promise<void>;
  select(item: IAutoCompleteItem): void;
  filter(e: any): void;
  open(): void;
  close(): void;
  handleKeyDown(ev: KeyboardEvent): void;
  render(): any;
}
