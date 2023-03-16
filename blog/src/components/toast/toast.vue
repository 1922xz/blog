<template>
  <v-snackbar v-model="show" :color="color" top :timeout="2000">
    <i :class="icon" style="margin-right: 10px">{{ message }}</i>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      type: "normal",
      color: "#49b1f5",
      icon: "",
    };
  },

  watch: {
    type(value) {
      switch (value) {
        default:
        case "error":
          this.color = "#F56C6C";
          this.icon = "iconfont iconcuowu";
          break;
        case "success":
          this.color = "#52C41A";
          this.icon = "iconfont iconchenggong";
          break;
        case "warnning":
          this.color = "#F57C00";
          this.icon = "iconfont iconchenggong";
      }
    },
  },
};
</script>