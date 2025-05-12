import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable } from "rxjs";
import { scan, shareReplay } from "rxjs/operators";

import { setupComponentTestingModule } from "../testing/test-lib";

import { LoadingService } from "./loading";

const TEST_ROUTE = "test-route";

@Component({
  template: "",
})
class FakeComponent {}

describe("The loading service", () => {
  let loadingService: LoadingService;
  let router: Router;

  /**
   * Observable which on subscription returns an accumulated array of all of
   * the values emitted by the loading service. Used to test that the sequence
   * of loading states emitted is correct.
   */
  let accumulatedLoadingState$: Observable<boolean[]>;

  beforeEach(() => {
    setupComponentTestingModule({
      declarations: [FakeComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: "",
            component: FakeComponent,
          },
          {
            path: TEST_ROUTE,
            component: FakeComponent,
          },
        ]),
      ],
      providers: [LoadingService],
    });

    loadingService = TestBed.inject(LoadingService);
    router = TestBed.inject(Router);

    accumulatedLoadingState$ = loadingService.getLoadingState().pipe(
      scan((acc: boolean[], curr: boolean) => [...acc, curr], []),
      shareReplay(1),
    );
  });

  it("should not initially show the loading spinner", () => {
    loadingService.getLoadingState().subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it("emits true on navigation start and false on navigation end", async () => {
    const fixture = TestBed.createComponent(FakeComponent);
    // Subscribe to make the observable hot and start collecting values before
    // navigating.
    accumulatedLoadingState$.subscribe();

    fixture.ngZone.run(async () => {
      router.navigate([TEST_ROUTE]);
      await fixture.whenStable();

      expect(router.routerState.snapshot.url).toBe(`/${TEST_ROUTE}`);
      accumulatedLoadingState$.subscribe((result) => {
        expect(result).toEqual([false, true, false]);
      });
    });
  });

  it(
    "allows a user to force the loading state manually using the " +
      "setLoadingState method",
    () => {
      // Subscribe to make the observable hot and start collecting values
      // before manually setting them.
      accumulatedLoadingState$.subscribe();

      loadingService.setLoadingState(true);
      loadingService.setLoadingState(false);

      accumulatedLoadingState$.subscribe((result) => {
        expect(result).toEqual([false, true, false]);
      });
    },
  );
});
