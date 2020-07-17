<template>
  <div class="component" :style="blockStyle">
    <div class="swiper" :style="imgStyle">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="30000"
        duration="500"
        :style="imgStyle"
      >
        <block v-for="(item, index) in attrs.data" :key="index" :style="imgStyle">
          <swiper-item class="swiper-item">
            <img
              :src="item.imageSrc"
              class="slide-image"
              mode="aspectFill"
              :style="imgStyle"
              @tap="onClick({ index })"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>
<script>
import mixins from "../../../mixins";
export default {
  mixins: [mixins],
  props: {
    attrs: {
      type: Object,
      default: {}
    }
  },
  computed: {
    imgStyle() {
      return this.styles({
        height: this.attrs.height + "rpx",
        borderRadius: 0 + "rpx"
      });
    }
  },
  methods: {}
};
</script>
<style scoped>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.swiper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 750rpx;
  margin-top: 0rpx;
  margin-bottom: 0rpx;
}
.swiper-container {
  display: flex;
  flex-direction: column;
  width: 750rpx;
}
.swiper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 750rpx;
}
.slide-image {
  display: flex;
  flex-direction: column;
  width: 750rpx;
}
</style>