<template>
  <div>
    
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: ["cover", "title"],
  mounted() {
    console.log(this.$route);
  },
  computed: {

  },
};
</script>
<style scoped>
</style>