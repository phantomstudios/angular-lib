import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

const HIDDEN_TEXTAREA_STYLES = {
  height: '0',
  left: '-100px',
  opacity: '0',
  position: 'fixed',
  top: '-100px',
  width: '0',
};

/**
 * Service which allows for programmatic interaction with the clipboard,
 * reducing boilerplate, ensuring compatibility with different browsers as well
 * as server environments where the document is not available.
 * @dynamic
 */
@Injectable({ providedIn: 'root' })
export class ClipboardService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: {},
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly platform: Platform
  ) {}

  /**
   * Attempts to copy the provided text to the user's clipboard by creating a
   * textarea element, selecting the text and using the
   * document.execCommand('paste') method. Returns a boolean representing
   * whether the copy was successful or not.
   */
  copyText(text: string): boolean {
    if (isPlatformServer(this.platformId)) { return false; }

    let isCopySuccessful = false;
    const textarea = this.createCopyTextarea(text);

    this.selectTextareaCopy(textarea);

    try {
      isCopySuccessful = this.document.execCommand('copy');
    } catch {
      // execCommand can fail in much older browsers, so it's worth catching the
      // error here, even though we're not doing anything with it. Failures can
      // be handled by doing something with the method's `false` return value.
    } finally {
      this.document.body.removeChild(textarea);
    }

    return isCopySuccessful;
  }

  private createCopyTextarea(text: string): HTMLTextAreaElement {
    const textarea = this.document.createElement('textarea');
    Object.assign(textarea.style, HIDDEN_TEXTAREA_STYLES);
    textarea.value = text;
    this.document.body.appendChild(textarea);

    return textarea;
  }

  private selectTextareaCopy(textarea: HTMLTextAreaElement) {
    if (this.platform.IOS) {
      textarea.style.fontSize = '16px';
      textarea.contentEditable = 'true';
      textarea.readOnly = false;
      textarea.setSelectionRange(0, 999999);
    } else {
      textarea.select();
    }
  }
}
