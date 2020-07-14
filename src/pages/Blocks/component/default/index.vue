<template>
  <div class="components" :style="blockStyle"></div>
</template>
<script>
import mixins from "../../mixins";
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