/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import VueEgret from 'vue-egret';

const examples = [
  require('./examples/test1.js').default,
  require('./examples/test2.js').default,
  require('./examples/watch.js').default,
  require('./examples/set.js').default,
  require('./examples/event.js').default,
  require('./examples/tick.js').default,
  require('./examples/directive.js').default,
];

window.Main = VueEgret.classMain(examples[Number(window.location.hash.slice(1) || '')]);
