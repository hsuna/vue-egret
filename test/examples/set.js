export default {
  data() {
    return {
      a: {},
      b: { a: 2 },
    };
  },
  mounted() {
    // this.a.b = 1; // => undefined
    this.$set(this.a, 'b', 1); // => 1
    // delete this.b.a; // => 还是1
    this.$delete(this.b, 'a'); // => undefined
  },
  template: `<Sprite>
        <TextField>{{a.b}}</TextField>
        <TextField y="100">{{b.a}}</TextField>
    </Sprite>`,
};
