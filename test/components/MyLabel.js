export default {
  name: 'MyLabel',
  props: {},
  data() {
    return {
      text1: 'loading',
    };
  },
  computed: {
    test3() {
      return this.text1 + this.text2;
    },
  },
  methods: {
    onLabelClick() {
      this.text1 += '1';
    },
  },
  template: `<Sprite>
        <TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{test3}}</TextField>
    </Sprite>`,
};
