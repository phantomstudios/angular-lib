import { Platform } from '@angular/cdk/platform';
import { PLATFORM_ID, Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { setupComponentTestingModule } from '../testing/test-lib';
import { ClipboardService } from './clipboard-service';

const PLATFORM_IOS_MOCK: Provider = {
  provide: Platform,
  useValue: { IOS: true },
};

const PLATFORM_SERVER_MOCK: Provider = {
  provide: PLATFORM_ID,
  useValue: 'server',
};

const TEST_COPY_TEXT = 'test copy text';

describe('The ClipboardService', () => {
  let clipboardService: ClipboardService;

  beforeEach(() => {
    setupComponentTestingModule({ providers: [ClipboardService] });

    clipboardService = TestBed.inject(ClipboardService);
  });

  it(`calls the execCommand document method with 'copy' as an argument`, () => {
    const execCommandSpy = spyOn(document, 'execCommand');
    clipboardService.copyText(TEST_COPY_TEXT);

    expect(execCommandSpy).toHaveBeenCalledWith('copy');
  });

  it('returns true when the call to execCommand succeeds', () => {
    spyOn(document, 'execCommand').and.returnValue(true);
    const result = clipboardService.copyText(TEST_COPY_TEXT);

    expect(result).toBe(true);
  });

  it('removes the textarea after successfully copying to the clipboard', () => {
    spyOn(document, 'execCommand').and.returnValue(true);
    clipboardService.copyText(TEST_COPY_TEXT);
    const textarea = document.body.querySelector('textarea');

    expect(textarea).toBeFalsy();
  });

  it('returns false when execCommand returns fails', () => {
    spyOn(document, 'execCommand').and.throwError('Copy to clipboard failed');
    const result = clipboardService.copyText(TEST_COPY_TEXT);

    expect(result).toBe(false);
  });

  it('removes the textarea when execCommand fails', () => {
    spyOn(document, 'execCommand').and.throwError('Copy to clipboard failed');
    clipboardService.copyText(TEST_COPY_TEXT);
    const textarea = document.body.querySelector('textarea');

    expect(textarea).toBeFalsy();
  });
});

describe('The ClipboardService when running on an iOS device', () => {
  let clipboardService: ClipboardService;

  beforeEach(() => {
    setupComponentTestingModule({
      providers: [ClipboardService, PLATFORM_IOS_MOCK],
    });

    clipboardService = TestBed.inject(ClipboardService);
  });

  it('copys to the clipboard', () => {
    spyOn(document, 'execCommand').and.returnValue(true);
    const result = clipboardService.copyText(TEST_COPY_TEXT);

    expect(result).toBe(true);
  });
});

describe(
  'The ClipboardService when running in a non-browser environment (such as ' +
    'the server)',
  () => {
    let clipboardService: ClipboardService;

    beforeEach(() => {
      setupComponentTestingModule({
        providers: [ClipboardService, PLATFORM_SERVER_MOCK],
      });

      clipboardService = TestBed.inject(ClipboardService);
    });

    it('does not copy to the clipboard', () => {
      const result = clipboardService.copyText(TEST_COPY_TEXT);

      expect(result).toBe(false);
    });
  }
);
