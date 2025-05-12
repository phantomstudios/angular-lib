import { Injectable } from "@angular/core";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { BehaviorSubject, merge, Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
} from "rxjs/operators";

function isNavigationEvent(event: Event): boolean {
  return (
    event instanceof NavigationEnd ||
    event instanceof NavigationError ||
    event instanceof NavigationStart ||
    event instanceof NavigationCancel
  );
}

/**
 * Service to provide an observable which indicates when the app is in a loading
 * state.
 */
@Injectable({
  providedIn: "root",
})
export class LoadingService {
  /**
   * An observable stream which emits true while data is loading during router
   * navigation and false when navigation is complete.
   */
  private readonly navigationLoadingState$ = this.router.events.pipe(
    filter((event) => isNavigationEvent(event)),
    map((event) => event instanceof NavigationStart),
    startWith(false),
  );

  private readonly userDefinedLoadingState = new BehaviorSubject(false);
  private readonly isLoading$ = merge(
    this.navigationLoadingState$,
    this.userDefinedLoadingState,
  ).pipe(distinctUntilChanged(), shareReplay(1));

  constructor(private readonly router: Router) {}

  /**
   * Returns an observable which emits the latest loading state from both
   * navigation events and manual user-defined states.
   */
  getLoadingState(): Observable<boolean> {
    return this.isLoading$;
  }

  /**
   * Allows the user to manually push loading states onto the stream outside of
   * navigation events (for example while a form is submitting).
   */
  setLoadingState(value: boolean) {
    this.userDefinedLoadingState.next(value);
  }
}
