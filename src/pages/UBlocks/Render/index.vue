<template>
  <div class="component">
    <div v-for="(block,index) in blocks" :key="index">
      <Ucell v-if="block.blockTag=='Cell'" :block="block" />
      <Unotic v-if="block.blockTag=='Notic'" :block="block" />
    </div>
  </div>
</template>
<script>
import Ucell from "../blocks/u-cell/index.vue";
import Unotic from "../blocks/u-notic/index.vue";
import { Component } from "vue-property-decorator";
export default {
  name: "Render",
  components: {
    Ucell,
    Unotic
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