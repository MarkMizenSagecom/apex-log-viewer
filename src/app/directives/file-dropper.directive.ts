import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[fileDropper]'
})
export class FileDropperDirective {

  private static readonly DEFAULT_BG = 'rgba(0, 0, 0, 0)';

  private static readonly HOVER_BG = 'rgba(0, 0, 0, 0.1)';

  @Output() filesUploaded: EventEmitter<FileList> = new EventEmitter<FileList>();

  @HostBinding('style.background')
  private background = FileDropperDirective.DEFAULT_BG;

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = FileDropperDirective.HOVER_BG;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = FileDropperDirective.DEFAULT_BG;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = FileDropperDirective.DEFAULT_BG;

    if (!event?.dataTransfer) {
      return;
    }
    const files: FileList = event.dataTransfer.files;
    this.filesUploaded.emit(files);
  }

}
