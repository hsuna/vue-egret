import MyLabel from '../components/MyLabel';

export default {
  components: {
    [MyLabel.name]: MyLabel,
  },
  data() {
    return {
      value: 1,
    };
  },
  mounted() {
    console.log(this.$stage, this.$stageWidth, this.$stageHeight);
  },
  methods: {
    onTouchTap() {
      this.$tween([['to', { value: 30 }, 3e3, egret.Ease.quadOut]]).then((res) => {
        console.log('-=-=-=-=');
      });
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTouchTap">
        <Component is="TextField" y="100">{{value}}</Component>
    </Sprite>`,
};
