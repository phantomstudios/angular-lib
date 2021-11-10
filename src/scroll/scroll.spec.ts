import {Component, OnDestroy} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WindowModule} from '@phntms/angular-lib/window';
import {ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {setupComponentTestingModule} from '../testing/test-lib';

import {ScrollDirection, ScrollService} from './scroll';

const DEFAULT_SCROLL_DISTANCE = 200;

@Component({
  selector: 'ph-scroll-service-test',
  template: `
    <header></header>
    <div></div>
    <footer></footer>`,
  styles: [`
    div {
      height: 10000px;
    }
  `],
})
class ScrollServiceTestComponent implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>(1);

  readonly scrollDirection$ = this.scrollService.getScrollDirection()
                                  .pipe(takeUntil(this.destroy))
                                  .subscribe(direction => {
                                    this.currentScrollDirection = direction;
                                  });
  readonly scrollPosition$ = this.scrollService.getScrollPosition()
                                 .pipe(takeUntil(this.destroy))
                                 .subscribe(position => {
                                   this.currentScrollPosition = position;
                                 });

  currentScrollPosition?: number;
  currentScrollDirection?: ScrollDirection;


  constructor(private readonly scrollService: ScrollService) {}

  ngOnDestroy() {
    this.destroy.next();
  }
}

function mockScrollEvent(scrollDepth = DEFAULT_SCROLL_DISTANCE) {
  const scrollEvent = document.createEvent('CustomEvent');
  scrollEvent.initCustomEvent('scroll', false, false, null);

  window.scrollTo(0, scrollDepth);
  window.dispatchEvent(scrollEvent);
}

describe('The scroll service', () => {
  let component: ScrollServiceTestComponent;
  let fixture: ComponentFixture<ScrollServiceTestComponent>;

  beforeEach(() => {
    setupComponentTestingModule({
      declarations: [
        ScrollServiceTestComponent,
      ],
      imports: [WindowModule],
    });
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('starts with the current scroll position', () => {
    fixture = TestBed.createComponent(ScrollServiceTestComponent);
    component = fixture.componentInstance;
    expect(component.currentScrollPosition).toBe(0);
  });

  it('gets the current scroll position', () => {
    fixture = TestBed.createComponent(ScrollServiceTestComponent);
    component = fixture.componentInstance;
    mockScrollEvent();

    expect(component.currentScrollPosition).toBe(DEFAULT_SCROLL_DISTANCE);
  });

  it('gets the current scroll direction when the user has scrolled down',
     () => {
       fixture = TestBed.createComponent(ScrollServiceTestComponent);
       component = fixture.componentInstance;
       mockScrollEvent();

       expect(component.currentScrollDirection).toBe(ScrollDirection.DOWN);
     });

  it('gets the current scroll direction when the user has scrolled up', () => {
    spyOn(window, 'pageYOffset').and.returnValue(DEFAULT_SCROLL_DISTANCE + 100);
    fixture = TestBed.createComponent(ScrollServiceTestComponent);
    component = fixture.componentInstance;
    mockScrollEvent();

    expect(component.currentScrollDirection).toBe(ScrollDirection.UP);
  });
});
