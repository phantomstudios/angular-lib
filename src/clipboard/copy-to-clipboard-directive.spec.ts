import { ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ClipboardModule } from './clipboard-module';
import { ClipboardService } from './clipboard-service';

const TEST_COPY_TEXT = 'Test copy text';

@Component({
  selector: 'ph-copy-to-clipboard-host',
  template: `
    <button [copyToClipboard]="textToCopy" (onCopy)="onCopyText($event)">
      Click to copy!
    </button>
  `,
})
class CopyToClipboardHostComponent {
  readonly textToCopy = TEST_COPY_TEXT;

  onCopyText() {}
}

function createKeyboardEvent(keyCode: number): KeyboardEvent {
  return new KeyboardEvent('keypress', { keyCode: keyCode } as any);
}

describe('The CopyToClipboard directive', () => {
  let clipboardService: ClipboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyToClipboardHostComponent],
      imports: [ClipboardModule],
    }).compileComponents();

    clipboardService = TestBed.inject(ClipboardService);
  });

  it(
    'calls the copyText method on the Clipboard service with the passed ' +
      'string',
    () => {
      const clipboardSpy = spyOn(clipboardService, 'copyText');
      const fixture = TestBed.createComponent(CopyToClipboardHostComponent);
      const compiled = fixture.debugElement.nativeElement;
      fixture.detectChanges();

      compiled.querySelector('button').click();

      expect(clipboardSpy).toHaveBeenCalledWith(TEST_COPY_TEXT);
    }
  );

  it(
    'calls copies when the host element is focused and the user presses ' +
      'the return or space key',
    () => {
      const fixture = TestBed.createComponent(CopyToClipboardHostComponent);
      const component = fixture.componentInstance;
      const onCopySpy = spyOn(component, 'onCopyText');
      const compiled = fixture.debugElement.nativeElement;
      const host = compiled.querySelector('button');
      host.focus();

      const enterKeyPress = createKeyboardEvent(ENTER);
      host.dispatchEvent(enterKeyPress);

      const spaceKeyPress = createKeyboardEvent(SPACE);
      host.dispatchEvent(spaceKeyPress);

      // Make sure that key presses with other keyCodes do not call the copy
      // method.
      const upArrowKeyPress = createKeyboardEvent(UP_ARROW);
      host.dispatchEvent(upArrowKeyPress);

      expect(onCopySpy).toHaveBeenCalledTimes(2);
    }
  );

  it(
    'emits true through the onCopy event emitter when the copy to clipboard ' +
      'succeeds',
    () => {
      spyOn(clipboardService, 'copyText').and.returnValue(true);
      const fixture = TestBed.createComponent(CopyToClipboardHostComponent);
      const component = fixture.componentInstance;
      const onCopySpy = spyOn(component, 'onCopyText');
      const compiled = fixture.debugElement.nativeElement;

      compiled.querySelector('button').click();

      expect(onCopySpy).toHaveBeenCalledWith(true);
    }
  );

  it(
    'emits false through the onCopy event emitter when the copy to clipboard' +
      'fails',
    () => {
      spyOn(clipboardService, 'copyText').and.returnValue(false);
      const fixture = TestBed.createComponent(CopyToClipboardHostComponent);
      const component = fixture.componentInstance;
      const onCopySpy = spyOn(component, 'onCopyText');
      const compiled = fixture.debugElement.nativeElement;

      compiled.querySelector('button').click();

      expect(onCopySpy).toHaveBeenCalledWith(false);
    }
  );
});
