import Graphics from '../components/Graphics';

export default {
  components: {
    [Graphics.name]: Graphics,
  },
  data() {
    return {
      rate: 0,
      height: 400,
    };
  },
  mounted() {
    window.test = this;
  },
  directives: {
    focus: {
      // 指令的定义
      bind(el) {
        console.log('bind', el.$parent);
      },
      // 指令的定义
      inserted(el) {
        console.log('inserted', el.$parent);
      },
      // 指令的定义
      update(el) {
        console.log('update', el.$parent);
      },
    },
  },
  methods: {
    onEnterFrame() {
      /* if (this.height > 200) {
        this.height--;
      } */
    },
    onTouchTap() {
      this.rate++;
    },
  },
  template: ` <Graphics 
        :draw="[
            ['rect', 0, 0, 480, height, 1, 0xffffff],
            ['circle', 0, 0, 154, 1, 15400928],
        ]"
        v-focus="height"
        touchEnabled="true"
        @touchTap="onTouchTap()"
        @enterFrame="onEnterFrame()"
    >
        <TextField>{{rate}}</TextField>
    </Graphics>`,
};
