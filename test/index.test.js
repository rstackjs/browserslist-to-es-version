import { assert, test } from '@rstest/core';
import { browserslistToESVersion } from '../src';

test('should get ECMA version correctly', () => {
  // IE
  assert.strictEqual(browserslistToESVersion(['ie >= 11']), 5);

  // Edge
  assert.strictEqual(browserslistToESVersion(['Edge >= 12']), 5);
  assert.strictEqual(browserslistToESVersion(['Edge >= 15']), 2017);
  assert.strictEqual(browserslistToESVersion(['Edge >= 79']), 2019);
  assert.strictEqual(browserslistToESVersion(['Edge >= 80']), 2020);
  assert.strictEqual(browserslistToESVersion(['Edge >= 85']), 2021);
  assert.strictEqual(browserslistToESVersion(['Edge >= 94']), 2022);
  assert.strictEqual(browserslistToESVersion(['Edge >= 110']), 2023);
  assert.strictEqual(browserslistToESVersion(['Edge >= 119']), 2024);

  // Firefox
  assert.strictEqual(browserslistToESVersion(['firefox >= 50']), 5);
  assert.strictEqual(browserslistToESVersion(['firefox >= 54']), 2017);
  assert.strictEqual(browserslistToESVersion(['firefox >= 78']), 2019);
  assert.strictEqual(browserslistToESVersion(['firefox >= 85']), 2021);
  assert.strictEqual(browserslistToESVersion(['firefox >= 93']), 2022);
  assert.strictEqual(browserslistToESVersion(['firefox >= 115']), 2023);
  assert.strictEqual(browserslistToESVersion(['firefox >= 145']), 2024);

  // Chrome
  assert.strictEqual(browserslistToESVersion(['Chrome >= 33']), 5);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 53']), 2016);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 63']), 2017);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 67']), 2018);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 73']), 2019);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 80']), 2020);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 85']), 2021);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 94']), 2022);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 110']), 2023);
  assert.strictEqual(browserslistToESVersion(['Chrome >= 119']), 2024);

  // Opera
  assert.strictEqual(browserslistToESVersion(['opera >= 30']), 5);
  assert.strictEqual(browserslistToESVersion(['opera >= 38']), 2015);
  assert.strictEqual(browserslistToESVersion(['opera >= 39']), 2016);
  assert.strictEqual(browserslistToESVersion(['opera >= 44']), 2017);
  assert.strictEqual(browserslistToESVersion(['opera >= 51']), 2018);
  assert.strictEqual(browserslistToESVersion(['opera >= 60']), 2019);
  assert.strictEqual(browserslistToESVersion(['opera >= 67']), 2020);
  assert.strictEqual(browserslistToESVersion(['opera >= 71']), 2021);
  assert.strictEqual(browserslistToESVersion(['opera >= 80']), 2022);
  assert.strictEqual(browserslistToESVersion(['opera >= 96']), 2023);
  assert.strictEqual(browserslistToESVersion(['opera >= 105']), 2024);

  // Samsung
  assert.strictEqual(browserslistToESVersion(['samsung >= 4']), 5);
  assert.strictEqual(browserslistToESVersion(['samsung >= 5']), 2015);
  assert.strictEqual(browserslistToESVersion(['samsung >= 6.2']), 2017);
  assert.strictEqual(browserslistToESVersion(['samsung >= 8.2']), 2018);
  assert.strictEqual(browserslistToESVersion(['samsung >= 11.1']), 2019);
  assert.strictEqual(browserslistToESVersion(['samsung >= 13']), 2020);
  assert.strictEqual(browserslistToESVersion(['samsung >= 14']), 2021);
  assert.strictEqual(browserslistToESVersion(['samsung >= 17']), 2022);
  assert.strictEqual(browserslistToESVersion(['samsung >= 21']), 2023);
  assert.strictEqual(browserslistToESVersion(['samsung >= 25']), 2024);

  // Safari
  assert.strictEqual(browserslistToESVersion(['safari >= 10']), 2015);
  assert.strictEqual(browserslistToESVersion(['safari >= 10.3']), 2017);
  assert.strictEqual(browserslistToESVersion(['safari >= 11']), 2017);
  assert.strictEqual(browserslistToESVersion(['safari >= 16.4']), 2018);
  assert.strictEqual(browserslistToESVersion(['safari >= 17']), 2023);
  assert.strictEqual(browserslistToESVersion(['safari >= 17.4']), 2024);

  // iOS
  assert.strictEqual(browserslistToESVersion(['iOS 8']), 5);

  // Android
  assert.strictEqual(browserslistToESVersion(['android >= 4.4']), 5);

  // Mixed
  assert.strictEqual(browserslistToESVersion(['ie >= 11', 'Chrome >= 53']), 5);
  assert.strictEqual(
    browserslistToESVersion(['Edge >= 15', 'Chrome >= 53']),
    2016,
  );
  assert.strictEqual(
    browserslistToESVersion([
      'iOS >= 9',
      'Android >= 4.4',
      'last 2 versions',
      '> 0.2%',
      'not dead',
    ]),
    5,
  );
  assert.strictEqual(
    browserslistToESVersion([
      'chrome >= 87',
      'edge >= 88',
      'firefox >= 78',
      'safari >= 14',
    ]),
    2017,
  );
  assert.strictEqual(
    browserslistToESVersion([
      'last 1 chrome version',
      'last 1 firefox version',
      'last 1 safari version',
    ]),
    2024,
  );
  assert.strictEqual(
    browserslistToESVersion([
      'iOS >= 10',
      'Chrome >= 51',
      '> 0.5%',
      'not dead',
      'not op_mini all',
    ]),
    2015,
  );

  // Other
  assert.strictEqual(browserslistToESVersion(['fully supports es6']), 2015);
  assert.strictEqual(
    browserslistToESVersion(['fully supports es6-module']),
    2017,
  );
  assert.strictEqual(browserslistToESVersion(['ie 11', 'baidu 7.12']), 5);
  assert.strictEqual(browserslistToESVersion(['ios_saf 11']), 2017);

  // https://github.com/browserslist/browserslist/issues/682
  assert.strictEqual(browserslistToESVersion(['and_ff >= 78']), 2024);
  assert.strictEqual(browserslistToESVersion(['and_chr >= 53']), 2024);
  assert.strictEqual(browserslistToESVersion(['ChromeAndroid >= 53']), 2024);
});
