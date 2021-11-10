# Scroll service

The scroll service provides a collection of useful methods allowing us to
interact with and read window scroll events in a centrliased and declarative
way.

## Using the service

The scroll service is dependent on the `WindowModule`, so you'll need to add
that to your AppModule's imports array:

```typescript
import { WindowModule } from "@phantom/angular/window";

@NgModule({
  // All your other AppModule providers, declarations, bootstrap.
  imports: [
    WindowModule,
    // Other imports
  ],
})
export class AppModule {}
```

The service is set with `providedIn: 'root'` in its `Injectable()` metadata
property, so all you need to do to use it is inject it directly into your
classes:

```typescript
import { ScrollService } from "@phantom/angular/scroll";

@Component({})
export class MyCommponent {
  constructor(private readonly scrollService: ScrollService) {}
}
```

## Methods

### Scroll position

The `getScrollPosition` method returns an observable which emits the current
`window.pageYOffset` whenever a scroll event is fired.

### Scroll direction

The `getScrollDirection` method returns an observable which on scroll emits the
current direction of the last window scroll event. Values can either be `UP` or
`DOWN` as declared by the exported `ScrollDirection` enum.
