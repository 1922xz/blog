<template>
  <div id="loading">
    <div class="juiceload">
      <div style="--x: 0"></div>
      <div style="--x: 1"></div>
      <div style="--x: 2"></div>
      <div style="--x: 3"></div>
      <div style="--x: 4"></div>
      <div style="--x: 5"></div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Skeleton'
};
</script>
<style scoped>
#loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #fdfdfd;
    display: flex;
    justify-content: center;
    align-items: center;
}

.juiceload {
    display: flex;
    flex-direction: row;
}

.juiceload div {
    position: relative;
    width: 40px;
    height: 200px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), #eef1f5);
    margin: 20px;
    border: 2px solid #eef1f5;
    border-radius: 20px;
    overflow: hidden;
}

.juiceload div::before {
    content: "";
    background-color: #eff2f3;
    position: absolute;
    top: 0;
    left: 0;
    width: 41px;
    height: 41px;
    border-radius: 50%;
    box-shadow: inset -5px -5px 5px rgba(0, 0, 0, .1), 0 420px 0 400px #87cefa;
    -webkit-animation: animate0 2s ease-in-out infinite;
    animation: animate0 2s ease-in-out infinite;
    -webkit-animation-delay: calc(var(--x) * -.3s);
    animation-delay: calc(var(--x) * -.3s);
    transform: translateY(160px);
}

@-webkit-keyframes animate0 {
    0% {
        transform: translateY(160px);
        filter: hue-rotate(0deg)
    }

    50% {
        transform: translateY(0);
        filter: hue-rotate(180deg)
    }

    100% {
        transform: translateY(160px);
        filter: hue-rotate(360deg)
    }
}

@keyframes animate0 {
    0% {
        transform: translateY(160px);
        filter: hue-rotate(0deg)
    }

    50% {
        transform: translateY(0);
        filter: hue-rotate(180deg)
    }

    100% {
        transform: translateY(160px);
        filter: hue-rotate(360deg)
    }
}
</style>