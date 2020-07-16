<template>
  <div class="component" :style="blockStyle"></div>
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
<style scoped>
</style>