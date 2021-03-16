import Graphics from '../components/Graphics';

export default {
  components: {
    [Graphics.name]: Graphics,
  },
  data() {
    return {
      value: 1,
      items: [0, 10, 20, 30, 40, 50],
      key: 'x',
    };
  },
  methods: {
    onTouchTap() {
      this.value++;
      this.key = this.value % 2 ? 'x' : 'y';
      console.log(this.value);
    },
    onTouchBegin() {
      console.log('onTouchBegin');
    },
    onTouchEnd() {
      console.log('onTouchEnd');
    },
  },
  template: `<Graphics 
        :draw="[
            ['rect', 0, 0, 480, 400, 1, 0xffffff]
        ]"
        touchEnabled="true" 
        @touchTap.once="onTouchTap"
    >
        <TextField v-if="value < 5" y="0">1</TextField>
        <TextField v-else-if="value < 10" y="50">2</TextField>
        <TextField v-else y="100">3</TextField>

        <TextField v-for="item in items" y="150" :x="item*2">4</TextField>

        <TextField touchEnabled="true" v-bind:[key]="value">v-bind:[key]</TextField>

        <TextField v-bind="{text: key}" y="200" touchEnabled="true" @touchTap.prevent></TextField>

        <TextField y="250" touchEnabled="true" v-on="{ touchBegin: onTouchBegin, touchEnd: onTouchEnd }">test</TextField>
    </Graphics>`,
};
