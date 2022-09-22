import { EventEmitter } from '../../stencil-public-runtime';
export declare class FileUpload {
  drop: boolean;
  multiple: boolean;
  url: string;
  onUploaded: EventEmitter;
  onUploading: EventEmitter;
  files: File[];
  uploadFiles(e: any): Promise<void>;
  renderLabel(): any;
  render(): any;
}
