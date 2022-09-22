import { EventEmitter } from '../../stencil-public-runtime';
export declare class Toggle {
  type: string;
  toggled: boolean;
  _toggled: boolean;
  onToggle: EventEmitter;
  componentWillLoad(): void;
  isToggled(): Promise<boolean>;
  toggle(): void;
  handleToggle(e: any): void;
  render(): any;
}
