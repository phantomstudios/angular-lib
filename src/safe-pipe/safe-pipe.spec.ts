import { inject, TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";

import { SafePipe } from "./safe-pipe";

class DomSanitizerMock {
  bypassSecurityTrustHtml(value: string): string {
    return value;
  }

  bypassSecurityTrustStyle(value: string): string {
    return value;
  }

  bypassSecurityTrustScript(value: string): string {
    return value;
  }

  bypassSecurityTrustUrl(value: string): string {
    return value;
  }

  bypassSecurityTrustResourceUrl(value: string): string {
    return value;
  }
}

describe("The SafePipe", () => {
  let domSanitizer: DomSanitizer;
  let safePipe: SafePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafePipe,
        { provide: DomSanitizer, useClass: DomSanitizerMock },
      ],
    });
  });

  beforeEach(inject([SafePipe], (pipe: SafePipe) => {
    domSanitizer = TestBed.inject(DomSanitizer);
    safePipe = pipe;
  }));

  it("sanitizes HTML correctly", () => {
    spyOn(domSanitizer, "bypassSecurityTrustHtml").and.callThrough();
    const mockHtml = "<h1>Some mock html</h1>";
    const safeHtml = safePipe.transform(mockHtml, "html");

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(safeHtml).toBe(mockHtml);
  });

  it("sanitizes styles correctly", () => {
    spyOn(domSanitizer, "bypassSecurityTrustStyle").and.callThrough();
    const mockStyle = "<style>h1{color:red}</style>";
    const safeStyle = safePipe.transform(mockStyle, "style");

    expect(domSanitizer.bypassSecurityTrustStyle).toHaveBeenCalled();
    expect(safeStyle).toBe(mockStyle);
  });

  it("sanitizes scripts correctly", () => {
    spyOn(domSanitizer, "bypassSecurityTrustScript").and.callThrough();
    const mockScript = `<script>const mockScript = 'mockScript'</script>`;
    const safeScript = safePipe.transform(mockScript, "script");

    expect(domSanitizer.bypassSecurityTrustScript).toHaveBeenCalled();
    expect(safeScript).toBe(mockScript);
  });

  it("sanitizes URLs correctly", () => {
    spyOn(domSanitizer, "bypassSecurityTrustUrl").and.callThrough();
    const mockUrl = "https://www.example.com";
    const safeUrl = safePipe.transform(mockUrl, "url");

    expect(domSanitizer.bypassSecurityTrustUrl).toHaveBeenCalled();
    expect(safeUrl).toBe(mockUrl);
  });

  it("sanitizes resource URLs correctly", () => {
    spyOn(domSanitizer, "bypassSecurityTrustResourceUrl").and.callThrough();
    const mockResourceUrl = "https://www.example.com";
    const safeResourceUrl = safePipe.transform(mockResourceUrl, "resourceUrl");

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
    expect(safeResourceUrl).toBe(mockResourceUrl);
  });
});
