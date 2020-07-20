<template>
  <div class="component">
    <div v-for="(block,index) in blocks" :key="index">
      <Ucell v-if="block.blockTag=='Cell'" :block="block" />
      <Unotic v-if="block.blockTag=='Notic'" :block="block" />
      <Ubanner v-if="block.blockTag=='Banner'" :block="block" />
      <Ublank v-if="block.blockTag=='Blank'" :block="block" />
    </div>
  </div>
</template>
<script>
import { Component } from "vue-property-decorator";
import Ucell from "../blocks/u-cell/index.vue";
import Unotic from "../blocks/u-notic/index.vue";
import Ubanner from "../blocks/u-banner/index.vue";
import Ublank from "../blocks/u-blank/index.vue";
export default {
  name: "Render",
  components: {
    Ucell,
    Unotic,
    Ubanner,
    Ublank
  },
  props: {
    /** 配置 */
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** 块组 */
    blocks: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>