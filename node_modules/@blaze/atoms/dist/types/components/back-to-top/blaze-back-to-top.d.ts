import { EventEmitter } from '../../stencil-public-runtime';
export declare class BackToTop {
  onBackToTop: EventEmitter;
  _isOpen: boolean;
  position: string;
  enable(): void;
  goUp(): void;
  render(): any;
}
