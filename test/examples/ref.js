import MyLabel from '../components/MyLabel';

export default {
  components: {
    [MyLabel.name]: MyLabel,
  },
  data() {
    return {
      text: 'text',
      items: [0, 10, 20, 30],
    };
  },
  updated() {
    console.log('-=-=-=');
  },
  methods: {
    onTouchTap() {
      this.text += '2';
      this.$nextTick(() => {
        console.log(this.$refs);
      });
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTouchTap">
        <TextField v-for="item in items" ref="text" y="0">{{item+text}}</TextField>
        <MyLabel v-for="item in items" ref="label" y="50">{{item+text}}</MyLabel>
        <Component is="TextField" y="100">{{text}}</Component>
    </Sprite>`,
};
