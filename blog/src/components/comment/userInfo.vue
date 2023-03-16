<template>
  <div class="user-meta">
    <v-avatar size="36" class="user-avatar">
      <img :src="item.avatar" />
    </v-avatar>
    <div class="user-info">
      <!-- 用户名 -->
      <div class="comment-user">
        <span v-if="!item.webSite">{{ item.nickname }}</span>
        <a v-else :href="item.webSite" target="_blank">
          {{ item.nickname }}
        </a>
        <v-icon size="20" color="#ffa51e" v-if="item.userId == 1">
          mdi-check-decagram
        </v-icon>
      </div>
      <!-- 信息 -->
      <div class="comment-info">
        <!-- 发表时间 -->
        <span style="margin-right: 10px">
          {{ item.createTime | date }}
        </span>
        <!-- 点赞 -->
        <v-icon
          size="16"
          class="like iconfont icondianzan'"
          @click="like(item)"
        >
          mdi-thumb-up
        </v-icon>
        <span v-show="item.likeCount > 0"> {{ item.likeCount }}</span>
        <!-- 回复 -->
        <span class="reply-btn" @click="replyComment(item)"> 回复 </span>
      </div>
      <p class="comment-content">
        <!-- 回复用户名 -->
        <template v-if="!item.replyComment">
          <span v-if="!item.replyWebSite" class="comment-nickname ml-1">
            @{{ item.replyUserName }}
          </span>
          <a
            v-else
            :href="item.replyWebSite"
            target="_blank"
            class="comment-nickname ml-1"
          >
            @{{ item.replyUserName }}
          </a>
        </template>
        <span v-html="item.commentContent"></span>
      </p>
      <!-- 回复框 -->
      <Reply ref="reply"  :type="this.type">
        <template slot=cancel slot-scope="{cancleReply}">
          <button class="cancle-btn v-comment-btn" @click="cancleReply">
            取消
          </button>
        </template>
      </Reply>
    </div>
  </div>
</template>


<script>
import Reply from "./Reply.vue";
export default {
  name: "userinfo",
  components: {
    Reply,
  },
  mounted() {
    // console.log(this.user,this.item);
    this.$bus.$on("hidden", () => {
      
    });
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    parentId:{
      type:Number
    },
    type:{
      type:Number,
    }
  },
  methods: {
    replyComment(item) {
      console.log(item);
      // this.$bus.$emit("hidden");
      // this.$refs.reply.$el.style.display = "none";
      this.$refs.reply.commentContent = "";
      this.$refs.reply.nickname = item.nickname;
      this.$refs.reply.replyUserId = item.userId;
      // alert(this.parentId)
      this.$refs.reply.parentId=this.parentId;
      this.$refs.reply.chooseEmoji = false;
      this.$refs.reply.$el.style.display = "block";
    },
    like(comment) {
      console.log(comment);
    },
  },
};
</script>


<style lang="scss">
.user-meta {
  display: flex;
  width: 100%;
  .user-avatar {
    margin-right: 0.8rem;
  }
  .user-info {
    width: 100%;
    border-bottom: 1px dashed #f5f5f5;
    .comment-user {
      font-size: 15px;
      line-height: 1.75;
      a {
        color: #1abc9c;
        font-weight: 500;
        transition: 0.3s all;
      }
    }
    .comment-info {
      line-height: 1.75;
      font-size: 0.75rem;
      color: #b3b3b3;
      .reply-btn {
        cursor: pointer;
        float: right;
        color: #ef2f11;
      }
      .like {
        cursor: pointer;
        font-size: 0.875rem;
        &:hover {
          color: #eb5055;
        }
      }
    }
    .comment-content {
      font-size: 0.875rem;
      line-height: 1.75;
      padding-top: 0.625rem;
      // white-space: pre-line;
      word-wrap: break-word;
      word-break: break-all;
      .comment-nickname{
        color: skyblue;
      }
    }
  }
}
</style>