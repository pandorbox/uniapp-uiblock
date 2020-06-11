<template>
  <div class="components">
    <div
      class="item"
      v-for="(item, index) in ditems"
      :key="index"
      @tap="onMenu({ index })"
      :class="index==tabIndex?'onTab':''"
    >
      <text>{{ item }}</text>
    </div>
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
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  name: "List",
  data() {
    return {
      ditems: ["菜单一", "菜单二", "菜单三", "菜单四", "菜单五"]
    };
  },
  mounted() {},
  methods: {
    onItem() {
      this.$emit("item", {});
    },
    onMenu({ index }) {
      this.$emit("item", { index });
    }
  }
};
</script>
<style lang="css" scoped>
.components {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 210px;
  background-color: #cccccc;
  height: 100%;
}
.item {
  width: 210px;
  line-height: 80px;
  text-align: center;
}
.onTab {
  background: #ffffff;
  color: red;
}
</style>
