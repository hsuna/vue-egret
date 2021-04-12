import Graphics from '../components/Graphics';

export default {
  components: {
    [Graphics.name]: Graphics,
  },
  data() {
    return {
      a: {
        b: {
          c: 1,
        },
      },
      b: 0,
      c: 0,
    };
  },
  mounted() {
    this.$watch('a.b.c', function (newVal, oldVal) {
      // 做点什么
      console.log('a.b.c', newVal, oldVal);
    });
    this.$watch(
      function () {
        // 表达式 `this.b + this.c` 每次得出一个不同的结果时
        // 处理函数都会被调用。
        // 这就像监听一个未被定义的计算属性
        return this.b + this.c;
      },
      function (newVal, oldVal) {
        // 做点什么
        console.log('this.b + this.c', newVal, oldVal);
      },
    );
    let unwatch = this.$watch('b', function (newVal, oldVal) {
      // 做点什么
      console.log('b', newVal, oldVal);

      // 之后取消观察
      unwatch();
    });
    this.$watch(
      'a',
      function (newVal, oldVal) {
        // 做点什么
        console.log('a', newVal, oldVal);
      },
      {
        deep: true,
        // immediate: true,
      },
    );
  },
  methods: {
    onTouchTap() {
      this.a.b.c += 1;
      this.b += 1;
      this.c -= 1;
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
