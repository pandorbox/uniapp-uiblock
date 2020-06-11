<template>
  <div class="components">
    <scroll-view
      scroll-y="true"
      :style="{ height: scrollHeight }"
      class="scroll-Y"
      :scroll-into-view="scrollInto"
      @scroll="onScroll"
      @touchstart="scrollTouch"
    >
      <div class="items" :id="'items' + indexs" v-for="(items, indexs) in ditmes" :key="indexs">
        <div
          class="item"
          v-for="(item, index) in items"
          :key="index"
          :id="index==0?'itemStart'+indexs:index==items.length-1?'itemEnd'+indexs:''"
        >
          <text>list----{{ item }}</text>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    scrollInto: {
      type: String,
      default: ""
    }
  },
  name: "List",
  data() {
    return {
      ditmes: [
        ["菜单一", "菜单一", "菜单一", "菜单一", "菜单一", "菜单一"],
        ["菜单二", "菜单二", "菜单二", "菜单二", "菜单二", "菜单二", "菜单二"],
        ["菜单三", "菜单三", "菜单三", "菜单三", "菜单三", "菜单三", "菜单三"],
        ["菜单四", "菜单四", "菜单四", "菜单四", "菜单四", "菜单四", "菜单四"],
        ["菜单五", "菜单五", "菜单五", "菜单五", "菜单五", "菜单五"]
      ],
      scrollHeight: "800px",
      tabIndex: 0
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: res => {
        /* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
        this.scrollHeight = `${res.windowHeight - 100}px`;
        console.log("gaodu", res.windowHeight);
      }
    });
  },
  mounted() {},
  methods: {
    onItem() {
      this.$emit("item", {});
    },
    async onScroll() {
      if (!this.isScroll) return;
      for (let i = 0; i < this.ditmes.length; i++) {
        // let resStart = await this.getScrollTop("#itemStart" + i);
        let resEnd = await this.getScrollTop("#itemEnd" + i);
        if (resEnd < 100 && resEnd > 0) this.tabIndex = i + 1;
      }
      let index = this.tabIndex;
      this.$emit("scroll", { index });
    },
    //获取距离顶部的高度
    getScrollTop(selector) {
      return new Promise((resolve, reject) => {
        let query = uni.createSelectorQuery().in(this);
        query
          .select(selector)
          .boundingClientRect(data => {
            console.log(data);
            resolve(data.top);
          })
          .exec();
      });
    },
    scrollTouch() {
      this.$emit("scrollTouch", {});
    }
  }
};
</script>
<style lang="css" scoped>
.components {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 540px;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 540px;
}
.item {
  width: 500px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border-bottom: 1px solid red;
}
</style>
