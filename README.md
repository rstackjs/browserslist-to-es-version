# browserslist-to-es-version

Convert [browserslist](https://github.com/browserslist/browserslist) query to ECMAScript version.

<p>
  <a href="https://npmjs.com/package/browserslist-to-es-version">
   <img src="https://img.shields.io/npm/v/browserslist-to-es-version?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/browserslist-to-es-version?minimal=true"><img src="https://img.shields.io/npm/dm/browserslist-to-es-version.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## CLI usage

In any package with a browserslist configuration:

```bash
$ npx browserslist-to-es-version
2017
```

Alternatively, you can provide a browserslist query as a string:

```bash
npx browserslist-to-es-version "Chrome >= 80, Firefox >= 72"
```

## API usage

Install:

```bash
npm add browserslist-to-es-version -D
```

Example:

```ts
import { browserslistToESVersion } from "browserslist-to-es-version";

const esVersion = browserslistToESVersion([
  "chrome >= 87",
  "edge >= 88",
  "firefox >= 78",
  "safari >= 14",
]);

console.log(esVersion); // 2017
```

### Type

```ts
// Only supports ES5 ~ ES2024
type ESVersion =
  | 5
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024;

function browserslistToESVersion(browsers: string[]): ESVersion;
```

## Data source

- https://caniuse.com/sr-es15
- https://caniuse.com/?search=es2023
- https://caniuse.com/?search=es2022
- https://caniuse.com/?search=es2021
- https://caniuse.com/?search=es2020
- https://caniuse.com/?search=es2019
- https://caniuse.com/?search=es2018
- https://caniuse.com/?search=es2017
- https://caniuse.com/?search=es2016
- https://caniuse.com/?search=es2015
- https://caniuse.com/?search=es5

## License

[MIT](./LICENSE).
