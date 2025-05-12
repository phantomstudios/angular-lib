import { Inject, Injectable } from "@angular/core";
import { animationFrameScheduler, fromEvent, Observable } from "rxjs";
import {
  distinctUntilChanged,
  map,
  pairwise,
  shareReplay,
  startWith,
  throttleTime,
} from "rxjs/operators";
import { WINDOW } from "../window";

export enum ScrollDirection {
  DOWN,
  UP,
}

/**
 * A service providing helper methods for interacting with scroll events.
 * @dynamic
 */
@Injectable({ providedIn: "root" })
export class ScrollService {
  private readonly scrollPosition$ = this.createPositionObservable();
  private readonly scrollDirection$ = this.createDirectionObservable();

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  getScrollDirection(): Observable<ScrollDirection> {
    return this.scrollDirection$;
  }

  private createDirectionObservable(): Observable<ScrollDirection> {
    return this.scrollPosition$.pipe(
      pairwise(),
      map(([previousPosition, currentPosition]) => {
        return previousPosition < currentPosition
          ? ScrollDirection.DOWN
          : ScrollDirection.UP;
      }),
      distinctUntilChanged(),
      shareReplay(1),
    );
  }

  getScrollPosition(): Observable<number> {
    return this.scrollPosition$;
  }

  private createPositionObservable(): Observable<number> {
    return fromEvent(this.window, "scroll").pipe(
      throttleTime(0, animationFrameScheduler),
      startWith(this.getCurrentScrollPosition()),
      map(() => this.getCurrentScrollPosition()),
      shareReplay(1),
    );
  }

  private getCurrentScrollPosition(): number {
    return this.window.scrollY;
  }
}
