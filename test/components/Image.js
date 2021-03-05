import egret from 'egret';
import RES from 'assetsmanager';

export default {
  name: 'Image',
  props: {
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    bitmapX: {
      type: Number,
      default: 0,
    },
    bitmapY: {
      type: Number,
      default: 0,
    },
    skin: {
      type: String,
      default: '',
    },
    fillMode: {
      type: String,
      default: 'repeat',
    },
    filters: {
      type: Array,
      default: () => [],
    },
    bitmapData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    texture() {
      if (this.bitmapData instanceof egret.BitmapData) {
        let texture = new egret.Texture();
        texture.bitmapData = this.bitmapData;
        return texture;
      } else if (this.skin) {
        return RES.getRes(this.skin);
      }
      return '';
    },
  },
  template: `<Bitmap :x="bitmapX" :y="bitmapY" :width="width" :height="height" :texture="texture" :fillMode="fillMode" :filters="filters"/>`,
};
