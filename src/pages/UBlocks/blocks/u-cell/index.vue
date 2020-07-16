<template>
  <div class="component" v-if="block.attrs && block.attrs.data && block.attrs.data.length > 0">
    <Default :attrs="block.attrs" v-if="block.attrs.styleType == 'default'" />
  </div>
</template>
<script>
import Default from "./default/index.vue";
export default {
  name: "ucomponent",
  components: { Default },
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {},
  methods: {
    onClick() {}
  }
};
</script>

<style scoped>
.component {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>