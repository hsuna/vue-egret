export default {
  name: 'Graphics',
  props: {
    draw: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.update(this.draw);
  },
  watch: {
    draw(newVal) {
      this.update(newVal);
    },
  },
  methods: {
    update(value) {
      const shape = this.$refs['shape'];
      if (shape) {
        const graphics = shape.graphics;
        graphics.clear();
        if (Array.isArray(value)) {
          value.forEach(([fnName, ...rest]) => {
            if ('function' === typeof graphics[fnName]) {
              graphics[fnName](...rest);
            } else if ('rect' === fnName) {
              graphics.beginFill(...rest.slice(4));
              graphics.drawRect(...rest);
              graphics.endFill();
            } else if ('circle' === fnName) {
              graphics.beginFill(...rest.slice(3));
              graphics.drawCircle(...rest);
              graphics.endFill();
            }
          });
        }
      }
    },
  },
  template: `<Sprite 
    ref="shape" 
    v-bind="$attrs"
    v-on="$listeners"
  ></Sprite>`,
};
