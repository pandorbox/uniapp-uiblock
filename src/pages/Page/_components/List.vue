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
      tabIndex: 0,
      itemsTop: []
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: res => {
        /* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
        this.scrollHeight = `${res.windowHeight - 100}px`;
      }
    });
  },
  mounted() {
    this.getBeginData();
  },
  methods: {
    onItem() {
      this.$emit("item", {});
    },
    getBeginData() {
      this.$nextTick(() => {
        this.getItemsTop();
      });
    },
    async getItemsTop() {
      for (let i = 0; i < this.ditmes.length; i++) {
        let res = await this.getScrollTop("#items" + i);
        this.itemsTop.push(res);
      }
    },
    async onScroll(e) {
      if (!this.isScroll) return;
      let top = e.detail.scrollTop + 210;
      let index = 0;
      if (top >= this.itemsTop[this.itemsTop.length - 1]) {
        index = this.itemsTop.length - 1;
      } else {
        index = this.itemsTop.findIndex((item, index) => {
          return this.itemsTop[index + 1] >= top;
        });
      }
      this.$emit("scroll", { index });
    },
    //获取距离顶部的高度
    getScrollTop(selector) {
      return new Promise((resolve, reject) => {
        let query = uni.createSelectorQuery().in(this);
        query
          .select(selector)
          .boundingClientRect(data => {
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
