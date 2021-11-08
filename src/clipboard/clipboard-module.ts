import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClipboardService } from './clipboard-service';
import { CopyToClipboardDirective } from './copy-to-clipboard-directive';

@NgModule({
  declarations: [CopyToClipboardDirective],
  exports: [CopyToClipboardDirective],
  imports: [CommonModule],
  providers: [ClipboardService],
})
export class ClipboardModule {}
