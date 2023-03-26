<template>
    <ul class="imglist">
      <li class="img"></li>
      <!-- <li class="item" 
      v-for="(img, index) in imglist" :key="index" 
      :style="{backgroundImage:'url('+img+')'}">
      </li> -->
    </ul>
</template>

<script>
export default {
  name: "mySwiper",
  props: {
    imglist: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped >
.img{
  z-index: -999;
  background-image: url("../../assets/img/swiper/2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  inset: 0px;
}
.imglist {
 /* width: 100vw; */
 /* height: 50vh; */
 overflow: hidden;
  /* position: relative; */
}
@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}
[data-theme=dark]:root .item{
  /* filter: brightness(46%); */
}
.item {
  will-change: auto;
   z-index: -999;
  filter: brightness(90%);
  width: 90vw;
  height: 90vh;
  position: fixed;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0;
  /* backface-visibility: hidden; */
  animation: imageAnimation 36s linear infinite 0s;
  /* transform-style: preserve-3d; */
}
.item:nth-child(2) {
  animation-delay: 6s;
}
.item:nth-child(3) {
  animation-delay: 12s;
}
.item:nth-child(4) {
  animation-delay: 18s;
}
.item:nth-child(5) {
  animation-delay: 24s;
}
.item:nth-child(6) {
  animation-delay: 30s;
}
</style>

