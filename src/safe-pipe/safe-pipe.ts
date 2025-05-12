import { NgModule, Pipe, PipeTransform } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from "@angular/platform-browser";

type SafeType = SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
type ContentType = "html" | "style" | "script" | "url" | "resourceUrl";

/**
 * Safe pipe which acts as a convenience wapper around the various methods of
 * Angular's DomSanitizer
 */
@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string, type: ContentType): SafeType {
    switch (type) {
      case "html":
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case "style":
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case "script":
        return this.sanitizer.bypassSecurityTrustScript(value);
      case "url":
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case "resourceUrl":
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`SafePipe unable to bypass security for invalid type:
            ${type}. Valid values are: 'html', 'style', 'script', 'url',
            'resourceUrl'`);
    }
  }
}

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe],
})
export class SafePipeModule {}
