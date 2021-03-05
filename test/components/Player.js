import egret from 'egret';

import Image from './Image';

const LOGO_BASE64 =
  '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';
// const STEP_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAUBAMAAAAevyJ8AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0fF33AAAAAAMdFJOUwDy9fwoXhzD+gh44fxijNEAAABLSURBVBjTYwgURAGiDDZnUMBhTAEdVIFDQ0igB1XgBMMZNMCw6LCxsbERSA5IG9toMbC5AIFbzJnjbiCGSwIDBLCeqWRABeEToAwAD3/F1ScutscAAAAASUVORK5CYII='

export default {
  name: 'Player',
  components: {
    [Image.name]: Image,
  },
  props: {
    skin: {
      type: String,
      default: '',
    },
    size: {
      type: Array,
      default: () => [0, 0],
    },
  },
  data() {
    return {
      canMove: null,

      width: 153,
      height: 101,

      bitmapData: null,
    };
  },
  created() {
    egret.BitmapData.create('base64', LOGO_BASE64, (bitmapData) => (this.bitmapData = bitmapData));
  },
  mounted() {
    console.log(this.size);
  },
  methods: {
    onTouchBegin(evt) {
      this.canMove = {
        x: evt.localX,
        y: evt.localY,
      };
    },
    onTouchMove(evt) {
      if (!this.canMove) return;

      let x = evt.stageX - this.canMove.x;
      let y = evt.stageY - this.canMove.y;
      if (x < 0) x = 0;
      else if (x > this.$stage.stageWidth - this.width) x = this.$stage.stageWidth - this.width;
      if (y < 0) y = 0;
      else if (y > this.$stage.stageHeight - this.height) y = this.$stage.stageHeight - this.height;
      this.$emit('move', { x, y });
    },
    onTouchEnd() {
      this.canMove = null;
    },
  },
  template: `<Sprite 
        touchEnabled="true" 
        @touchBegin="onTouchBegin"
        @touchMove="onTouchMove"
        @touchEnd="onTouchEnd"
    >
        <Image x="0" y="0" :width="width" :height="height" :bitmapData="bitmapData" fillMode="scale" />
    </Sprite>`,
};
