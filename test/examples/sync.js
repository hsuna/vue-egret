import MyLabel from '../components/MyLabel';

export default {
  components: {
    [MyLabel.name]: MyLabel,
  },
  data() {
    return {
      text: '1',
    };
  },
  mounted() {
    window.test = this;
  },
  methods: {
    onTouchTap() {
      this.text += '2';
    },
  },
  template: `<Sprite>
        <TextField>{{text}}</TextField>
        <MyLabel :text.sync="text" @touchTap.native="onTouchTap"></MyLabel>
    </Sprite>`,
};
