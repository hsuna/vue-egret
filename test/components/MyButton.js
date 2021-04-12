export default {
  name: 'MyButton',
  props: {
    skin: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log('MyButton', this.skin);
    this.$emit('test', '1111');
  },
  methods: {
    onLabelClick() {
      this.$emit('test', '1111');
    },
  },
  template: `<MyImage touchEnabled="true" @touchTap="onLabelClick" :skin="skin"></MyImage>`,
};
