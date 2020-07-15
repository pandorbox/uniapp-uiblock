<template>
  <div class="page">
    <Render :blocks="Ldata.uData" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import DData from "./Data";
import NData, { Param, Data } from "./NData";
import Logic from "./Logic";
import BaseVue from "@qjk/npm-pack/dist/core/base/BaseVue";
import Render from "../UBlocks/Render/index.vue";
@Component({
  components: { Render }
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
}
</style>
