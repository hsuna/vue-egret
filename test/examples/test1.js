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
  methods: {
    onEnterFrame() {
      this.rate++;
      // this.height--
    },
    onTouchTap() {
      this.height--;
    },
  },
  template: ` <Graphics 
        :draw="[
            ['rect', 0, 0, 480, height, 1, 0xffffff],
            ['circle', 0, 0, 154, 1, 15400928],
        ]"
        touchEnabled="true"
        @enterFrame="onEnterFrame"
        @touchTap="onTouchTap"
    >
        <TextField>{{rate}}</TextField>
    </Graphics>`,
};
