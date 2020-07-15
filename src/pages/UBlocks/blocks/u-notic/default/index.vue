<template>
  <div class="component" :style="blockStyle">
    <text>Notic组件</text>
  </div>
</template>
<script>
import mixins from "../../../mixins";
export default {
  mixins: [mixins],
  props: {
    block: {
      type: Object,
      default: {}
    }
  },
  computed: {},
  methods: {}
};
</script>