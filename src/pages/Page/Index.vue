<template>
  <div class="page">
    <LeftMenu class="left" @item="emit($event, 'onMenu')" :tabIndex="Ldata.tabIndex" />
    <List
      class="right"
      :scrollInto="Ldata.scrollInto"
      @scroll="emit($event,'onScroll')"
      @scrollTouch="emit($event,'onScrollTouch')"
      :isScroll="Ldata.isScroll"
    />
    <!-- <Demo /> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import DData from "./Data";
import NData, { Param, Data } from "./NData";
import Logic from "./Logic";
import BaseVue from "@qjk/npm-pack/dist/core/base/BaseVue";
import LeftMenu from "./_components/LeftMenu.vue";
import List from "./_components/List.vue";
import Demo from "./_components/Demo.vue";

@Component({
  components: { LeftMenu, List, Demo }
})
export default class Index extends Mixins(BaseVue) {
  logic = new Logic();
  Data = Data;
  async mounted() {
    await this.logic.onBeingCreated();
    this.Ldata = this.logic.data;
    this.Ndata = Data;
  }
}
</script>
<style lang="css" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  margin-bottom: 40px;
  position: relative;
}
.left {
  width: 210px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.right {
  width: 540px;
  margin-left: 210px;
}
</style>
