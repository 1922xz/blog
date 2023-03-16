<template>
  <div>
    <div class="comment-title">
      <i class="iconfont icon-liuyan"></i>
      评论{{ showCommentSize }}--{{ count }}
    </div>
    <!-- 评论框 -->
    <div class="comment-wrapper">
      <div style="display: flex; width: 100%">
        <v-avatar size="36">
          <img
            v-if="this.$store.state.avatar"
            :src="this.$store.state.avatar"
          />
          <img v-else :src="this.$store.state.blogInfo.touristAvatar" />
        </v-avatar>
        <Reply ComType="liuyan" :type="type" @getComments="listComments" />
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="count > 0">
      <!-- 评论列表 -->
      <div
        class="comment-wrapper"
        v-for="(item, index) of commentList"
        :key="item.id"
      >
        <userInfo :item="item" :type="type" :parentId="item.id" />
        <!-- 回复人 -->
        <div
          style="display: flex"
          v-for="reply of item.replyComment"
          :key="reply.id"
        >
          <userInfo
            :item="reply"
            class="reply-meta"
            :type="type"
            :parentId="item.id"
          />
        </div>
        <!-- 回复数量 -->
        <div
          class="mb-3"
          style="font-size: 0.75rem; color: #6d757a"
          v-show="item.replyCommentCount > 4"
          ref="check"
        >
          共
          <b>{{ item.replyCommentCount }}</b>
          条回复，
          <span
            style="color: #00a1d6; cursor: pointer"
            @click="checkReplies(index, item)"
          >
            点击查看
          </span>
        </div>
        <!-- 分页器 -->
        <div ref="paging" style="display: none">
          <paging
            :id="item.id"
            :replyCount="item.replyCommentCount"
            :size="8"
            :continue="3"
            @currentChange="currentChange"
          />
        </div>
      </div>
      <!-- 加载按钮 -->
      <div class="load-wrapper">
        <v-btn
          @click="listComments()"
          outlined
          v-show="count > showCommentSize"
        >
          加载更多...
        </v-btn>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
  </div>
</template>

<script>
import Reply from "./Reply.vue";
import userInfo from "./userInfo.vue";
import paging from "../common/paging.vue";
import { getReplyById,getComments } from "@/api/comment.js";
export default {
  components: { userInfo, Reply, paging },
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    // console.log(this.$bus.$off);
    this.$bus.$on("getComments", (index) => {
      // alert(index)
      this.listComments(index);
    });
    this.listComments();
  },
  data() {
    return {
      commentList: [],
      count: 0,
      current: 1,
    };
  },
  methods: {
    currentChange(value, id) {
      this.current = value;
      getReplyById({
        id,
        current: this.current,
      }).then(({ replyCommentList }) => {
        console.log("得到恢复啦", replyCommentList);
        this.commentList.forEach((e) => {
          if (e.id === id) {
            e.replyComment = replyCommentList;
          }
        });
      });
    },
    checkReplies(index, item) {
      // console.log('item:',item,'index:',index);
      let params = {
        id: item.id,
        current: 1,
      };
      getReplyById({
        params,
      }).then(({ replyCommentList }) => {
        console.log('得到回鹘啦',replyCommentList);
        this.commentList[index].replyComment = replyCommentList;
        this.$refs.check[index].style.display = "none";
        // console.log(this.$refs.paging[index]);
        this.$refs.paging[index].style.display = "block";
      });
    },
    listComments(index) {
      // alert(index)
      if (index === 1) {
        this.current = 1;
      }
      const path = this.$route.path;
      const arr = path.split("/");
      var param = {
        current: this.current,
        type: this.type,
        topicId: arr[2],
      };
      console.log(this.type);
      if (this.type == 1 || this.type == 3) {
        param.topicId = arr[2];
      }
      getComments(param)
        .then(({ commentList, count }) => {
          console.log(commentList,this.current);
          if (this.current == 1) {
            this.commentList = commentList;
            this.count = count;
          } else {
            this.commentList.push(...commentList);
          }
          this.current++;
        });
    },
  },
  computed: {
    showCommentSize() {
      let length = this.commentList.length;
      this.commentList.forEach((e) => {
        length += e.replyCommentCount;
      });
      return length;
    },
  },
  beforeDestroy() {
    this.$bus.$off("getComments", () => {});
  },
};
</script>
<style scoped lang="scss">
.comment-title {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  margin-top: 20px;
  i {
    font-size: 1.5rem;
    margin-right: 5px;
  }
}
.comment-wrapper {
  &:hover {
    box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
    transform: translateY(-3px);
  }
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgba(7, 12, 27, 0.16);
  transition: all 0.3s ease 0s;
  .reply-meta {
    margin-left: 1.4rem;
  }
}
.load-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: #49b1f5;
    color: var(--grey-0);
  }
}
</style>