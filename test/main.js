import VueEgret from 'vue-egret';

const examples = [
    require('./examples/test1.js').default
];

window.Main = VueEgret.classMain(examples[Number(window.location.hash.slice(1) || '')]);