export default {
  name: 'MyLabel',
  props: {
    text: {
      type: String,
      default: '123',
    },
  },
  methods: {
    onLabelClick() {
      this.$emit('update:text', this.text + '1');
    },
  },
  template: `<Sprite>
        <TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{text}}</TextField>
    </Sprite>`,
};