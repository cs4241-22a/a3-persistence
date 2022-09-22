import { EventEmitter } from '../../stencil-public-runtime';
export declare class Pagination {
  page: number;
  pages: number;
  _currentPage: number;
  onPage: EventEmitter;
  goToPage(page: number): Promise<void>;
  currentPage(): Promise<number>;
  componentWillLoad(): void;
  render(): any;
}
