<template>
  <div class="scroll-down" @click="scrollDown">
    <v-icon color="var(--grey-0)" class="scroll-down-effects"> mdi-chevron-down</v-icon>
  </div>
</template>

<script>
export default {
  methods: {
    scrollDown() {
      window.scrollTo({
        behavior: "smooth",
        top: document.documentElement.clientHeight,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
.scroll-down {
  cursor: pointer;
  position: fixed;
  bottom: 0;
  width: 100%;
  i {
    font-size: 3rem;
  }
  .scroll-down-effects {
    color: rgb(27, 27, 27) !important;
    text-align: center;
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
    line-height: 1.5;
    width: 100%;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    animation: scroll-down-effect 1.5s infinite;
  }
}
</style>