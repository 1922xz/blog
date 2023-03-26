<template>
  <div class="reply-input-wrapper" :class="ComType" ref="reply">
    <textarea
      class="comment-textarea"
      :placeholder="placeholder"
      auto-grow
      dense
      v-model="commentContent"
    />
    <div class="emoji-container">
      <span
        :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
        @click="chooseEmoji = !chooseEmoji"
      >
        <i class="iconfont icon-biaoqing" />
      </span>
      <div style="margin-left: auto">
        <slot name="cancel" :cancleReply="cancleReply"></slot>
        <button @click="insertReply" class="upload-btn v-comment-btn">
          提交
        </button>
      </div>
    </div>
    <!-- 表情框 -->
    <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
  </div>
</template>

<script>
import Emoji from "./Emoji";
import EmojiList from "../../assets/js/emoji";
import {addComment} from "@/api/comment"
export default {
  components: {
    Emoji,
  },
  props: {
    type: {
      type: Number,
      required:true
    },
    ComType: {
      type: String,
      default: "reply",
    },
  },
  data() {
    return {
      index: 1,
      chooseEmoji: false,
      nickname: "",
      replyUserId: null,
      parentId: null,
      commentContent: "",
    };
  },
  methods: {
    cancleReply() {
      this.$refs.reply.style.display = "none";
    },
    insertReply() {
      //判断登录
      if (!this.$store.state.user.userId) {
        this.$store.state.user.loginFlag = true;
        return false;
      }
      if (this.commentContent.trim() == "") {
        this.$toast({ type: "error", message: "回复不能为空" });
        return false;
      }
      //解析表情
      var reg = /\[.+?\]/g;
      this.commentContent = this.commentContent.replace(reg, function (str) {
        return (
          "<img src= '" +
          EmojiList[str] +
          "' width='24'height='24' style='margin: 0 1px;vertical-align: text-bottom'/>"
        );
      });
      const path = this.$route.path;
      const arr = path.split("/");
      var comment = {
        type: this.type,
        replyUserId: this.replyUserId,
        parentId: this.parentId,
        commentContent: this.commentContent,
        userId:this.$store.state.user.userId
      };
      // console.log(comment);
      switch (this.type) {
        case 1:
        case 3:
          comment.topicId = arr[2];
          break;
        default:
          break;
      }
      addComment(comment).then(data => {
        console.log(data)
        if (data.flag) {
          this.$bus.$emit("getComments", this.index);
          this.$toast({ type: "success", message: "回复成功" });
          this.commentContent = "";
        } else {
          this.$toast({ type: "error", message: data.message });
        }
      });
    },
    addEmoji(text) {
      this.commentContent += text;
    },
  },
  computed: {
    placeholder() {
      return this.ComType == "reply"
        ? "回复 @" + this.nickname + "："
        : "请输入留言";
    },
  },
};
</script>

<style scoped lang='scss'>
.reply-input-wrapper {
  width: 100%;
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
  .comment-textarea {
    font-size: 0.875rem;
    color: #555;
    outline: none;
    padding: 10px 5px;
    min-height: 122px;
    resize: none;
    width: 100%;
    border-radius: 4px;
    
  }
  .emoji-container {
    margin: 10px 0;
    display: flex;
    align-items: center;
    .emoji-btn-active {
      cursor: pointer;
      font-size: 1.3rem;
      color: #66b1ff;
    }
    .emoji-btn {
      cursor: pointer;
      font-size: 1.3rem;
    }
    .upload-btn {
      color: var(--grey-0);
      margin-left: 1rem;
      background-color: #49b1f5;
      &:hover {
        background-color: #ff7242;
      }
    }
    .v-comment-btn {
      border: 1px solid #ededed;
      border-color: var(--grey-0);
      border-radius: 4px;
      text-align: center;
      padding: 6px 16px;
      font-size: 14px;
      transition: all 0.3s;
      outline: none;
    }
  }
}

.reply {
  display: none;
}
.liuyan {
  display: block;
  border: none;
}
</style>
