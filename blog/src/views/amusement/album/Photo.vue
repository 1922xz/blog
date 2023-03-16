<template>
  <div>
    <!-- banner -->
    <banner :title="photoAlbumName" :cover="photoAlbumCover" />
    <!-- 相册列表 -->
    <v-card class="blog-container">
      <div class="photo-wrap">
        <img
          :src="item"
          v-for="(item, index) of photoList"
          class="photo"
          :key="index"
          @click="preview(index)"
        />
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading>
    </v-card>
  </div>
</template>

<script>
import { getPhotos } from "@/api/album.js";
import banner from "@/components/content/banner";
export default {
  data() {
    return {
      photoAlbumName: "",
      photoAlbumCover: "",
      photoList: [],
      current: 1,
      size: 10,
    };
  },
  methods: {
    preview(index) {
      // console.log(document.documentElement.clientHeight,document.documentElement.clientWidth);
      // console.log(this.$imagePreview);
      this.$imagePreview({
        images: this.photoList,
        index: index,
      });
    },
    infiniteHandler($state) {
      getPhotos(this.$route.params.albumsId, {
        current: this.current,
        size: this.size,
      }).then((data) => {
        this.photoAlbumCover = data.photoAlbumCover;
        this.photoAlbumName = data.photoAlbumName;
        if (data.photoList.length) {
          this.current++;
          this.photoList.push(...data.photoList);
          $state.loaded();
          $state.complete();
        } else {
          $state.complete();
        }
      });
    },
  },
  components: {
    banner,
  },
};
</script>


<style scoped lang="scss">
  .pswp {
    width: 100vw !important;
    height: 100vh !important;
  }
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
  .photo {
    margin: 3px;
    cursor: pointer;
    flex-grow: 1;
    object-fit: cover;
    height: 200px;
  }
  &::after {
    content: "";
    display: block;
    flex-grow: 50;
  }
}
@media (max-width: 759px) {
  .photo {
    width: 100%;
  }

}
</style>
