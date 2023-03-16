<template>
  <!-- 用户信息 -->
  <div class="user-info-wrapper">
    <v-avatar size="36" class="user-avatar">
      <img :src="item.avatar" />
    </v-avatar>
    <div class="user-detail-wrapper">
      <div class="user-nickname">
        {{ item.nickname }}
        <v-icon class="user-sign" size="20" color="#ffa51e">
          mdi-check-decagram
        </v-icon>
      </div>
      <!-- 发表时间 -->
      <div class="time">
        {{ item.createTime | time }}
        <span class="top" v-if="item.isTop == 1">
          <i class="iconfont iconzhiding" /> 置顶
        </span>
      </div>
      <!-- 说说信息 -->
      <div class="talk-content" v-html="item.content" />
      <!-- 图片列表 -->
      <v-row class="talk-images" v-if="item.images">
        <v-col
          :md="4"
          :cols="6"
          v-for="(img, index) of item.images"
          :key="index"
        >
          <v-img
            class="images-items"
            :src="img"
            aspect-ratio="1"
            max-height="200"
            @click.prevent="previewImg(img)"
          />
        </v-col>
      </v-row>
      <!-- 说说操作 -->
      <div class="talk-operation">
        <div class="talk-operation-item">
          <v-icon size="16" class="like-btn" @click.prevent="like(item)">
            mdi-thumb-up
          </v-icon>
          <div class="operation-count">
            {{ item.likeCount == null ? 0 : item.likeCount }}
          </div>
        </div>
        <div class="talk-operation-item">
          <v-icon size="16" color="#999">mdi-chat</v-icon>
          <div class="operation-count">
            {{ item.commentCount == null ? 0 : item.commentCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      previewList: [],
    };
  },
  methods: {
    previewImg(img) {
      this.$imagePreview({
        images: this.previewList,
        index: this.previewList.indexOf(img),
      });
    },
  },
  watch: {
    item: {
      immediate: true,
      handler() {
        if (this.item.imgList) {
          this.previewList.push(...this.item.imgList);
        }
      },
    },
  },
};
</script>
<style lang='scss'>
.user-info-wrapper {
  width: 100%;
  display: flex;
  .user-avatar {
    border-radius: 50%;
    transition: all 0.5s;
    &:hover {
      transform: rotate(360deg);
    }
  }
  .user-detail-wrapper {
    flex: 1;
    margin-left: 10px;
    width: 0;
    .user-nickname {
      font-size: 15px;
      font-weight: bold;
      vertical-align: middle;
      .user-sign {
        margin-left: 4px;
      }
    }
    .time {
      color: #999;
      margin-top: 2px;
      font-size: 12px;
      .top {
        color: #ff7242;
        margin-left: 10px;
      }
    }
    .talk-content {
      margin-top: 8px;
      font-size: 14px;
      white-space: pre-line; //可以换行
      word-wrap: break-word;
      word-break: break-all;
    }
    .talk-images {
      padding: 0 10px;
      margin-top: 8px;
      .images-items {
        cursor: pointer;
        border-radius: 4px;
      }
    }
    .talk-operation {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .talk-operation-item {
        display: flex;
        align-items: center;
        margin-right: 40px;
        font-size: 12px;
        .like-btn:hover {
          color: #eb5055;
        }
        .operation-count {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>