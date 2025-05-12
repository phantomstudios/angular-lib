import { isPlatformBrowser } from "@angular/common";
import {
  ClassProvider,
  FactoryProvider,
  Injectable,
  InjectionToken,
  NgModule,
  PLATFORM_ID,
} from "@angular/core";

export const WINDOW = new InjectionToken("WindowToken");

/**
 * Define abstract class for obtaining reference to the global window object.
 */
export abstract class WindowRef {
  abstract get nativeWindow(): Window;
}

/**
 * Define class that implements the abstract class and returns the native window
 * object.
 */
@Injectable()
export class BrowserWindowRef extends WindowRef {
  get nativeWindow(): Window {
    return window;
  }
}

export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: InjectionToken<Object>,
): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  } else {
    return {};
  }
}

export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

@NgModule({
  providers: [browserWindowProvider, windowProvider],
})
export class WindowModule {}
