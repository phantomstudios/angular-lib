import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from "@angular/core";

/**
 * Directive to handle the functionality for dragging and dropping one or more
 * files onto an element on the page - frequently used for uploading files.
 */
@Directive({
  selector: "[filesDropArea]",
  standalone: true,
})
export class FilesDropAreaDirective {
  /**
   * Class activated on the host element while the user is dragging files over
   * the top of it.
   */
  @HostBinding("class.dragover-active") isDragoverActive = false;

  /** Emits the file or files dragged and dropped onto the element. */
  @Output() readonly filesDrop = new EventEmitter<FileList>();

  @HostListener("dragover", ["$event"])
  onDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragoverActive = true;
  }

  @HostListener("dragleave", ["$event"])
  onDragleave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragoverActive = false;
  }

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragoverActive = false;
    const { files } = event.dataTransfer;
    if (files.length) {
      this.filesDrop.emit(files);
    }
  }
}
