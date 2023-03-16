<template>
  <div>
    <!-- 相册内容 -->
    <v-card class="blog-container">
      <v-col :md="6" v-for="item of photoAlbumList" :key="item.id">
        <div class="album-item">
          <v-img class="album-cover" :src="item.albumCover" />
          <router-link :to="'/albums/' + item.id" class="album-wrapper">
            <div class="album-name">{{ item.albumName }}</div>
            <div class="album-desc">{{ item.albumDesc }}</div>
          </router-link>
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import { getAlbum } from "@/api/album.js";
export default {
  mounted() {
    this.listPhotoAlbums();
  },
  data() {
    return {
      photoAlbumList: [],
      cover: "",
    };
  },
  methods: {
    listPhotoAlbums() {
      getAlbum().then((data) => {
        this.photoAlbumList = data;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.album-item {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #000;
  border-radius: 0.5rem;
  .album-cover {
    position: relative;
    max-width: none;
    width: calc(100% + 1.25rem);
    height: 250px;
    opacity: 0.8;
    transition: opacity 0.35s, transform 0.35s;
    transform: translate3d(-10px, 0, 0);
    object-fit: cover;
  }
  .album-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.8rem 2rem;
    color: #fff !important;
    .album-name {
      font-weight: bold;
      font-size: 1.25rem;
      overflow: hidden;
      padding: 0.7rem 0;
      position: relative;
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--grey-0);
        content: "";
        transition: transform 0.35s;
        transform: translate3d(-101%, 0, 0);
      }
    }
    .album-desc {
      margin: 0;
      padding: 0.4rem 0 0;
      line-height: 1.5;
      opacity: 0;
      transition: opacity 0.35s, transform 0.35s;
      transform: translate3d(100%, 0, 0);
    }
  }
  &:hover .album-cover {
    transform: translate3d(0, 0, 0);
    opacity: 0.4;
  }
  &:hover .album-wrapper .album-name:after {
    transform: translate3d(0, 0, 0);
  }
  &:hover .album-wrapper .album-desc {
    opacity: 1;
    filter: none;
    transform: translate3d(0, 0, 0);
  }
}
</style>