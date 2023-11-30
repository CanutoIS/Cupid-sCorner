export {}

import * as utils from 'com/utils.js';
import * as validators from 'com/validators.js';
import * as errors from 'com/errors.js';

declare module 'com' {
  export { utils, validators, errors };
}