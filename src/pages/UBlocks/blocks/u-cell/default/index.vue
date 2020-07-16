<template>
  <div class="component" :style="blockStyle">
    <text>Cell组件</text>
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
  computed: {},
  methods: {}
};
</script>