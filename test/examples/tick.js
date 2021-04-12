import Graphics from '../components/Graphics';

export default {
  components: {
    [Graphics.name]: Graphics,
  },
  data() {
    return {
      height: 400,
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log('callback', this.height);
    });
    this.$nextTick().then(() => {
      console.log('promise', this.height);
    });
  },
  methods: {
    onTouchTap() {
      this.height++;
    },
  },
  template: `<Graphics 
        :draw="[
            ['rect', 0, 0, 480, height, 1, 0xffffff]
        ]"
        touchEnabled="true" 
        @touchTap="onTouchTap"
    >
    </Graphics>`,
};
