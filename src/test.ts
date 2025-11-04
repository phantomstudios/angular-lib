// This file is required by karma.conf.js and loads recursively all the .spec
// and framework files

import "core-js/es/reflect";
import { getTestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);
// Then we explicitly import all test files
import "./clipboard/copy-to-clipboard-directive.spec";
import "./share/share.spec";
import "./window/window.spec";
