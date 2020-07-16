<template>
  <div class="component" :style="blockStyle">
    <div class="notic" :style="blockStyle">
      <div class="notic-icon">
        <image :src="attrs.iconSrc||icon" :style="iconStyle" />
      </div>
      <div class="notic-tit">
        <swiper
          :style="itemStyle"
          :interval="6000"
          :circular="true"
          :indicator-dots="false"
          :autoplay="true"
          :vertical="true"
          :duration="duration"
        >
          <block v-for="(item, index) in attrs.data" :key="index">
            <swiper-item class="swiper-item">
              <text @tap="onItem({ index })" :style="fontStyle">{{ item.title }}</text>
            </swiper-item>
          </block>
        </swiper>
      </div>
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
  data() {
    return {
      icon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEc0lEQVR4Xu2bQchVRRTHf7YyaiUU1CLKjWALyRZBG42oJDURrU1CVGpSFFYGglRqbYICQSuSigLb1KYSISnIlabVrl2JbYwoirCEWkjyhxkZ57vzvjlz7533vO8NfHzf997cM+f85twzc+ecu4DJbjcD+jnWl5oL+hLcgdxXgV1OzifAQx3InCNiUgG8DWyLtL2rD0+YNADXAu8lZnvwAG4C3gfuTrj6oAHc5mZev1NtsAA045p5eUDYFPlXBh8MEoAiu+553fthE5DFQwegKK9oH7d9wLPA1x0BWAQ8APwMfA/8HQ44rlVA67vW+bjtBV52H3YBYCnwMXCrk7kH2D1uAG8AzzUYvwPQd761BRAbL7mKK4oll1pND7jKBbtHIuP/BZ4G3o0+bwOgyXiJ3wR8NA4A17lgtzYy8jdnvNw0bqUAUsbPcX8NWMMDlriZvzOy8EfgKeDLBuP1UQkAk/E1AMhoLWmCEDZFY60C3yWMLwFgNr5vAGuc8XL/sGlmtwCnRxhvBVBkfJ8AFOg08wp8YfsMeAz4cx7jLQCKje8LgJa4cDnztn4IPAr8n2G8BcDnQBxcGwNe07ipIKhTmHsBPZzo74WZSqtbuH/3l/ndnUFMdhA843T0srONT3mAdkp+N2ZRONVXsrTDs7bcVeB14Hkn3GR8EwCtxw9aNR3R/xlgf6G8XAASLy89D/xuHSu8BbqceT14vAgcsioU9LcAKB7GA7jBrck3BpKOAt+4z/8xjtDFKW5VAPHsy/B7AKvhRk4ju1cFEC8lcx4aurQsU1ZVAGeB0P1rPCPMx6EqgHhzMgMw3/RU+H7mAR2dCY6cK+/qs1sgwnQlxQAt4SsSzyCjZl9HY5uG4AE/BKe+1tC0ZwgA4mBpgTAIALoFNhZ4wWElTIbgAZYZn9N3BsAhmS2DV/Ay2Mkt8AegLKpvt7hsaivhLS+uuhXW8/8dgcI6vf2gpQFtL68KID4Q+dbV6lyWS29rkfH6qgDuA76IFNT/X7miAqPunRQ2VgUgA5sSDFbDff+TgE6ET5UKKEyOmocLH3pUpPQWsNospfmCX4HNwJFCeRYP0KHuf5kpt8vUaXrq2wro5/ZCxcPLLgCPA0qLWVsugDeBJ53w1omRUMkNwHJgGXCNQfum1NgLgDI4lpYLQEUWYQbaBKGP5/5UcvQ1YKeBQC4AJV8ejuRmQ+gDgHRJpceVMtctkdNyAUxcetwblyqQ0GqzLoNALgCJKobQlwd4+1IlMieAVcC5ESAsAIoh9A1Aio0qkrof+CkBwQqgCEINAFIsVSb3l9t3HG+AUALADKEWACmWKpTUd+uBTyMIpQBGQXgCOBiOUxOAHzdVKquyuXcC5doASEEYa6lsCD5VLP0S8Irr2BZAE4SJ8AAPIlUuf8CVz3YBwMcflf384oqlFXcutXHcAuH4qRcmVKt0fc3cYMa+pLcuU/3KjKc61S9NeQhT/dqchzDVL06GQWZqX50NIeilqu3uMGbqXp72IK52+YouCi8bl7GLT/4nUG+qT0kAAAAASUVORK5CYII="
    };
  },
  computed: {
    /** 文字滚动间隔 */
    interval() {
      return this.boundFloat(this.attrs.interval, 1000, 6000);
    },
    duration() {
      return this.interval + 100;
    },
    /** 图标大小 */
    iconSize() {
      return this.boundFloat(this.attrs.iconSize, 20, 50);
    },
    /** 字体大小 */
    fontSize() {
      return this.boundFloat(this.attrs.fontSize, 10, 50);
    },
    /** 区块高度 */
    blockHeight() {
      let defaultheight = 100;
      if (this.fontSize > this.iconSize) return this.fontSize + 40;
      if (this.fontSize == this.iconSize) return this.fontSize + 40;
      if (this.iconSize > this.fontSize) return this.iconSize + 40;
      return defaultheight;
    },
    /** 滚动条高度 */
    itemHeight() {
      let itemHeight = this.iconSize + 20;
      return itemHeight;
    },
    /** 图标样式 */
    iconStyle() {
      return this.styles({
        height: this.iconSize + "rpx",
        width: this.iconSize + "rpx"
      });
    },
    /** 滚动条样式  */
    itemStyle() {
      return this.styles({
        height: this.itemHeight + "rpx",
        lineHeight: this.itemHeight + "rpx"
      });
    },
    fontStyle() {
      return this.styles({
        color: this.attrs.textColor,
        fontSize: this.fontSize + "rpx"
      });
    }
  },
  methods: {}
};
</script>
<style scoped>
.component {
  width: 750rpx;
  display: flex;
  justify-content: center;
}
.notic {
  display: flex;
  align-items: center;
}
.notic-icon {
  margin-right: 20rpx;
}

.notic-tit {
  width: 620rpx;
  align-items: center;
}
.swiper-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>