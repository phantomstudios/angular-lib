import {Component, Inject, PLATFORM_ID, NgModule} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {setupComponentTestingModule} from '../testing/test-lib';

import {browserWindowProvider, WINDOW, windowProvider} from './window';

@Component({
  selector: 'ph-window-test-host',
  template: '',
})
class WindowTestHostComponent {
  constructor(@Inject(WINDOW) private readonly window: Window) {}

  getWindow() {
    return this.window;
  }
}

enum PlatformType {
  BROWSER = 'browser',
  SERVER = 'server',
}

function setupWindowTestingModule(platformType: PlatformType) {
  @NgModule({
    providers: [
      {
        provide: PLATFORM_ID,
        useValue: platformType,
      },
      browserWindowProvider,
      windowProvider,
    ],
  })
  class MockWindowModule {}

  setupComponentTestingModule({
    declarations: [WindowTestHostComponent],
    imports: [MockWindowModule],
  });
}

describe('The window provider', () => {
  let component: WindowTestHostComponent;
  let fixture: ComponentFixture<WindowTestHostComponent>;

  describe('when in the browser', () => {
    beforeEach(() => {
      setupWindowTestingModule(PlatformType.BROWSER);

      fixture = TestBed.createComponent(WindowTestHostComponent);
      component = fixture.componentInstance;
    });

    it('gets the window object', () => {
      const window = component.getWindow();

      expect(window).toBeDefined();
    });

    it('allows for interaction with the window methods properties and methods',
       () => {
         const {innerHeight, innerWidth, setTimeout} = component.getWindow();

         expect(innerHeight).toBeGreaterThan(0);
         expect(innerWidth).toBeGreaterThan(0);
         expect(typeof setTimeout).toBe('function');
       });
  });

  describe('when on the server', () => {
    beforeEach(() => {
      setupWindowTestingModule(PlatformType.SERVER);

      fixture = TestBed.createComponent(WindowTestHostComponent);
      component = fixture.componentInstance;
    });

    it('gets an empty object instead of the window when on the server', () => {
      expect(Object.keys(component.getWindow())).toEqual([]);
    });
  });
});
