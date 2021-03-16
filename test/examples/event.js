import Graphics from '../components/Graphics';

export default {
  components: {
    [Graphics.name]: Graphics,
  },
  data() {
    return {};
  },
  mounted() {
    /* this.$on('test', function (msg) {
      console.log(msg);
    }); */
    /* this.$once('test', function (msg) {
      console.log(msg);
    }); */
    let handler = (msg) => {
      console.log(msg);
      this.$off('test', handler);
    };
    this.$on('test', handler);
  },
  methods: {
    onTouchTap() {
      this.$emit('test', 'hi');
    },
  },
  template: `<Graphics 
        :draw="[
            ['rect', 0, 0, 480, 400, 1, 0xffffff]
        ]"
        touchEnabled="true" 
        @touchTap="onTouchTap"
    >
    </Graphics>`,
};
