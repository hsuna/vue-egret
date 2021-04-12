export default {
  name: 'MyImage',
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
    console.log('MyImage', this.skin);
  },
  methods: {},
  computed: {
    texture() {
      return this.skin;
    },
  },
  template: `<Sprite>
        <TextField>{{texture}}</TextField>
    </Sprite>`,
};
