<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
    <!-- 说说内容 -->
    <v-card class="blog-container">
      <div class="talk-item" v-for="item of talkList" :key="item.id">
        <router-link :to="'/talks/' + item.id">
          <talkCard :item='item'/>
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
// import { getTalks } from "@/api/talk";
import talkCard from './talkCard.vue'
export default {
  components:{
    talkCard
  },
  mounted() {
    this.getListTalks();
  },
  data() {
    return {
      current: 1,
      size: 10,
      talkList: [],
      count: 0,
      previewList: [],
    };
  },
  methods: {
    getListTalks() {
      this.axios.get('http://localhost:3008/api/talks',{
        params:{
          current: this.current,
        size: this.size,
        }
      }).then((res) => {
        console.log(res);
        if (this.current == 1) {
          this.talkList = res.recordList;
        } else {
          this.talkList.push(...res.recordList);
        }
        this.talkList.forEach((item) => {
          if (item.imgList) {
            this.previewList.push(...item.imgList);
          }
        });
      });
    },

  },
  computed: {
    cover() {
      var cover = "";
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel == "talk") {
          cover = item.pageCover;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    },
  },
};
</script>
<style scoped lang="scss">
.talk-item {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgba(7, 7, 7, 0.06);
  transition: all 0.3s ease 0s;
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
  &:hover {
    box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
    transform: translateY(-3px);
  }
  &:not(:first-child) {
    margin-top: 20px;
  }
}
</style>