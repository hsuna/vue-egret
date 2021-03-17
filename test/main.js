/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import VueEgret from 'vue-egret';

window.Main = VueEgret.classMain(
  require(`./examples/${window.location.hash.slice(1) || 'test'}.js`).default,
);
