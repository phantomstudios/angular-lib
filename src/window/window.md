# Window provider

A provider for the global `window` object which can be injected into components
via dependency injection.

There are two main advantages to this:

1. It provides a neat wrapper around the global window object with conditional
   checks to handle cases where the application is not running in a browser (i.e.
   using Angular Universal or in a service worker).

2. Accessing global objects is discouraged in all its forms in Angular
   applications. Explicitly injecting our dependencies allows for much more
   modular, less tightly coupled code, and allows for much easier mocking in tests.

# Usage

You'll need to add `WindowModule` to your AppModule's imports array:

```typescript
import { WindowModule } from "@phntms/angular-lib/window";

@NgModule({
  // All your other AppModule providers, declarations, bootstrap.
  imports: [
    WindowModule,
    // Other imports
  ],
})
export class AppModule {}
```

In your components you can inject and have reference to a local window property
like so:

```typescript
import { WINDOW } from "@phntms/angular-lib/window";

@Component({})
class WindowTestHostComponent {
  constructor(@Inject(WINDOW) private readonly window: Window) {}
}
```
