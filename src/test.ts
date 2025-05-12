// This file is required by karma.conf.js and loads recursively all the .spec
// and framework files

import "core-js/es/reflect";
import "zone.js";
import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we explicitly import all test files
import "./clipboard/copy-to-clipboard-directive.spec";
import "./share/share.spec";
import "./window/window.spec";
