# angular-lib

A collection of Angular libraries Phantom developed sites.

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Package one-liner overview.

## Introduction

Package introduction, couple of paragraphs, with small code example.

### Clipboard

```typescript
import {ClipboardModule} from '@phantom/angular';

@NgModule({
  imports: [
    ClipboardModule,
  ],
})
export class Foo {}
```

```html
<button [copyToClipboard]="copyMyContents" aria-label="Copy to clipboard">
  Copy to clipboard
</button>
```

### Files drop area

Examples TBC.

### Scroll

[See documentation](src/scroll/scroll.md).

## Installation

Install this package with `npm`.

```bash
npm i @phntms/angular-lib
```

## Usage

### Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io). You can run the tests in watch mode if
you prefer with `ng test --watch=false`. Make sure the project is build before
running tests using `npm run build`. All tests are run in a pre-push hook
meaning you will not be able to push broken code to the repo.

### Testing locally

Build and test the project first.

```bash
npm run build

npm run test
```

From another project, link the build files as a dependency.

```bash
cd ~/projects/my-test-project

npm link ../phntms-angular-lib/dist/angular-lib/
```

## API

### Input

If package has different inputs, a list of inputs alongside descriptions of what they do, types, and if required / optional etc.

### Output

If package has different outputs, a list of outputs alongside descriptions of what they do, types, etc.

### Browser Support

If browser support is limited, a few lines about what's supported.

### Planned

If package isn't completed, a list of features planned in future releases.

## 🍰 Contributing

Want to get involved, or found an issue? Please contribute using the GitHub Flow. Create a branch, add commits, and open a Pull Request or submit a new issue.

Please read `CONTRIBUTING` for details on our `CODE_OF_CONDUCT`, and the process for submitting pull requests to us!

[npm-image]: https://img.shields.io/npm/v/@phntms/angular-lib.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@phntms/angular-lib
[npm-downloads-image]: https://img.shields.io/npm/dm/@phntms/angular-lib.svg
[npm-downloads-url]: https://npmcharts.com/compare/@phntms/angular-lib?minimal=true
[ci-image]: https://github.com/phantomstudios/angular-lib/workflows/test/badge.svg
[ci-url]: https://github.com/phantomstudios/angular-lib/actions
