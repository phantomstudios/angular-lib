import { SPACE, ENTER } from "@angular/cdk/keycodes";
import { Directive, EventEmitter, Input, Output } from "@angular/core";

import { ClipboardService } from "./clipboard-service";

/**
 * A directive for an element providing functionality to copy text to the user's
 * clipboard on click. Also optionally provides the user with an `onCopy` event
 * to listen to in order to show the user confirmation or failure of the copy
 * action.
 *
 * Example usage:
 *
 * <button copyToClipboard="Test copy text" (onCopy)="doSomething($event)">
 *   Click to copy
 * </button>
 */
@Directive({
  selector: "[copyToClipboard]",
  host: {
    "(click)": "copy()",
    "(keypress)": "onKeyPress($event)",
  },
  standalone: true,
})
export class CopyToClipboardDirective {
  @Input("copyToClipboard") text = "";
  @Output() readonly onCopy = new EventEmitter<boolean>();

  constructor(private readonly clipboardService: ClipboardService) {}

  onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      this.copy();
    }
  }

  copy() {
    const result = this.clipboardService.copyText(this.text);
    this.onCopy.emit(result);
  }
}
