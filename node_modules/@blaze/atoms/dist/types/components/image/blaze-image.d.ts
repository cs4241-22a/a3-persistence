export declare class Image {
  el: HTMLElement;
  _src: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  photo: string;
  user: string;
  likes: boolean;
  collection: string;
  filter: string;
  io: IntersectionObserver;
  generateSrc(): string;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  loadImage(): void;
  cleanup(): void;
  render(): any;
}
