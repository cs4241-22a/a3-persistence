import { EventEmitter } from '../../../stencil-public-runtime';
export declare class TreeBranch {
  expanded: boolean;
  onExpand: EventEmitter;
  onCollapse: EventEmitter;
  toggleExpanded(): void;
  expand(): Promise<void>;
  collapse(): Promise<void>;
  render(): any[];
}
