import { EventEmitter } from '../../stencil-public-runtime';
import { IOption } from './interfaces';
export declare class Tags {
  optionRef: HTMLOptionElement;
  autocompleteRef: any;
  placeholder: string;
  autocomplete: boolean;
  options: string;
  _placeholder: string;
  _options: Array<IOption>;
  choices: Array<IOption>;
  inputValue: string;
  onAdd: EventEmitter;
  onFilter: EventEmitter;
  setOptions(options?: Array<IOption>): Promise<any>;
  componentWillLoad(): void;
  addChoice(choice: IOption): void;
  select(e: any): void;
  handleInput(e: any): void;
  handleEnter(e: any): void;
  removeChoice(i: number): void;
  filter(e: any): void;
  renderAutocomplete(): any;
  renderDropdown(): any;
  renderInput(): any;
  renderField(): any;
  render(): any;
}
