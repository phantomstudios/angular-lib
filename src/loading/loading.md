# Loading service

A service which allows users to define global loading states for their
application in order to be able to indicate to the user when the application is
in a loading state.

Angular applications using resolvers to pre-fetch data or route guards which
make asyncronous requests are extremely useful, but in many cases can result in
the application hanging while requests are resolving before navigating to the
new route. For larger requests especially this delay can make for very poor user
experience as the user has no visual indication that the application is
responding to their attempted navigation. This service addresses this by
creating an observable stream which declaratively responds to navigation events:
emitting false when there is no pending navigation, and true while navigation is
occuring - most importantly while resolvers and guards are making server
requests.

## Using the service

The service is set with `providedIn: 'root'` in its `Injectable()` metadata
property, so all you need to do to use it is inject it directly into your
classes.

Typical usage is to inject the service into your AppComponent with a loading bar
or spinner set to display in the template only when the value shared by the
`getLoadingState()` method is `true`.

Below is the most straightforward example using the Angular Material progress
bar:

```typescript
import { LoadingService } from "@phantom/angular/loading";

@Component({
  template: `
    <mat-progress-bar *ngIf="isLoading$ | async" mode="indeterminate">
      <router-outlet></router-outlet>
    </mat-progress-bar>
  `,
})
export class AppCommponent {
  readonly isLoading$ = this.loadingService.getLoadingState();

  constructor(private readonly loadingService: LoadingService) {}
}
```

## Public methods

### getLoadingState()

Returns an observable which emits the latest loading state value as a boolean.
By default it responds to navigation events automatically, returning true while
there is a pending navigation otherwise false.

### setLoadingState()

Allows the user to manually push a loading state onto the stream. The
`getLoadingState` method merges navigation events and these manually triggered
loading states, so your application can respond to both types of loading state
using the same stream.
