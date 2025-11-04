// This file is required by karma.conf.js and loads recursively all the .spec
// and framework files

import "core-js/es/reflect";
import { NgModule, provideZonelessChangeDetection } from "@angular/core";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";

declare const require: any;

// Create a custom testing module with zoneless support
@NgModule({
  imports: [BrowserTestingModule],
  providers: [provideZonelessChangeDetection()],
})
class ZonelessBrowserTestingModule {}

// First, initialize the Angular testing environment without Zone.js.
getTestBed().initTestEnvironment(
  ZonelessBrowserTestingModule,
  platformBrowserTesting(),
);
// Then we explicitly import all test files
import "./clipboard/copy-to-clipboard-directive.spec";
import "./share/share.spec";
import "./window/window.spec";
