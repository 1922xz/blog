<template>
  <div>
    <div class="chat-container animated bounceInUp" v-show="isShow">
      <!-- 标题 -->
      <div class="header">
        <img
          width="32"
          height="32"
          src=""
        />
        <div style="margin-left: 12px">
          <div>聊天室</div>
          <div style="font-size: 12px">当前{{ peopleCount }}人在线</div>
        </div>
        <v-icon class="close" @click="isShow = false">mdi-close</v-icon>
      </div>
      <!-- 对话内容 -->

      <div class="message" id="message">
        <div class="welcome">{{ welcomeInfo }}</div>
        <div
          :class="isMyMessage(item)"
          v-for="(item, index) of receiveMsg"
          :key="index"
        >
          <!-- 头像 -->
          <img :src="item.avatar" class="avatar" />
          <div>
            <div class="nickname" v-if="!isSelf(item)">
              {{ item.nickName }}
              <span style="margin-left: 12px">
                {{ item.createTime | hour }}
              </span>
            </div>
            <!-- 内容 -->
            <div ref="content" class="content">
              <!-- 文字消息 -->
              <div v-html="item.content" />
              <div class="back-menu" ref="backBtn" @click="back(item, index)">
                撤回
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <!-- 表情框 -->
        <div class="emoji-box" v-show="isEmoji">
          <emoji @addEmoji="addEmoji" :chooseEmoji="true" />
        </div>
        <!-- 切换输入方式 -->
        <v-icon style="margin-right: 8px"> mdi-microphone </v-icon>
        <!-- 文字输入 -->
        <edit
          placeholder="请输入内容"
          v-model="content"
          ref="editor"
          class="edit"
        />
        <!-- 表情 -->
        <i
          class="iconfont icon-emoji"
          style="font-size: 1.5rem"
          :style="isEmoji ? 'color:#FFC83D' : ''"
          @click="openEmoji"
        />
        <!-- 发送按钮 -->
        <i :class="isInput" style="font-size: 1.5rem" @click="saveMessage" />
      </div>
    </div>
    <!-- 未读数量 -->
    <div class="chat-btn" @click="open">
      <span class="unread" v-if="peopleCount > 0">{{ peopleCount }}</span>
      <img
        width="100%"
        height="100%"
        src=""
      />
    </div>
  </div>
</template>

<script>
import edit from "@/components/common/edit";
import emoji from "../comment/Emoji.vue";
export default {
  components: { edit, emoji },
  data() {
    return {
      count: 0,
      isShow: false,
      isEmoji: false,
      emoji: "",
      webSocket: null,
      peopleCount: 0,
      content: "",
      receiveMsg: [],
      welcomeInfo: "",
    };
  },
  methods: {
    saveMessage() {
      
      // console.log(this.$store);
      let socketMsg = {
        content: this.content,
        userId: this.$store.state.userId,
      };
      this.webSocket.send(JSON.stringify(socketMsg));
      this.$refs.editor.clear();
      this.isEmoji = false;
    },
    addEmoji(key, value) {
      this.$refs.editor.addText(
        "<img src= '" +
          value +
          "' width='24'height='24' alt=" +
          key +
          " style='margin: 0 1px;vertical-align: text-bottom' ondragstart='return false'/>"
      );
    },
    openEmoji() {
      this.isEmoji = !this.isEmoji;
    },
    open() {
      if (this.webSocket == null) {
        this.connect();
      }
      this.unreadCount = 0;
      this.isShow = !this.isShow;
    },
    connect() {
      this.webSocket = new WebSocket(
        `ws://localhost:3006?token=${localStorage.getItem("token")}`
      );
      // 连接发生错误的回调方法
      this.webSocket.onerror = (event) => {
        console.log(event);
        alert("失败");
      };
      // 连接成功建立的回调方法
      (this.webSocket.open = () => {
        // console.log(event);
      }),
        // 接收到消息的回调方法
        (this.webSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          switch (data.type) {
            case "number":
              this.peopleCount = data.data;
              break;
            case "replyAll":
              this.receiveMsg.push(data.data);
              break;
            case "welcome":
              this.welcomeInfo = data.data;
              break;
          }
        });
        this.webSocket.onclose=()=>{
          
        }
    },
    close(){
              
    },
    back() {},
  },
  mounted() {},
  computed: {
    isInput() {
      return this.content
        ? "iconfont icon-fasongActive"
        : "iconfont icon-fasong";
    },
    isMyMessage() {
      return (item) => {
        return this.isSelf(item) ? "my-message" : "user-message";
      };
    },
    isSelf() {
      return (item) => {
        return item.email == this.$store.state.email;
      };
    },
  },
};
</script>

<style scoped lang='scss'>
.edit {
  overflow-y: auto;
  max-height: 50px;
}
@media (min-width: 760px) {
  .chat-container {
    /* background-color: black; */
    position: fixed;
    bottom: 104px;
    right: 20px;
    height: calc(85% - 64px - 20px);
    min-height: 250px;
    max-height: 590px;
    width: 400px;
    border-radius: 16px;
    color: #4c4948;
  }
}
.chat-container {
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  font-size: 14px;
  background: #f4f6fb;
  z-index: 999;
}
.header {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: var(--grey-0)fff;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 10px 15px -16px rgba(50, 50, 93, 0.08),
    0 4px 6px -8px rgba(50, 50, 93, 0.04);
}
.close {
  display: block;
  margin-left: auto;
}
.footer {
  padding: 8px 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--grey-2);
  display: flex;
  align-items: center;
  border-radius: 0 0 1rem 1rem;
}
.emoji-box {
  z-index: 999;
  width: 300px;
  height: 180px;
  overflow-y: auto;
  position: absolute;
  right: 20px;
  bottom: 52px;
  background: var(--grey-0);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(50, 50, 93, 0.08), 0 4px 12px rgba(0, 0, 0, 0.07);
  padding: 6px 16px;
}
.chat-btn {
  background: #1f93ff;
  border-radius: 100px;
  height: 60px;
  width: 60px;
  z-index: 1000;
  position: fixed;
  bottom: 15px;
  right: 15px;
  user-select: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}
.unread {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  background: #f24f2d;
  color: var(--grey-0);
  text-align: center;
  font-size: 14px;
}
.welcome {
  // position: absolute;
  text-align: center;
  color: #7a7675;
  font-size: 8px;
}
.message {
  position: absolute;
  width: 100%;
  padding: 20px 16px 0 16px;
  top: 80px;
  bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
}
.user-message {
  display: flex;
  margin-bottom: 10px;
  .avatar {
    margin-right: 10px;
  }
  .content {
    margin-right: 45px;
    background-color: var(--grey-0);
    border-radius: 5px 20px 20px 20px;
    width: fit-content;
  }
}
.my-message {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;
  .avatar {
    order: 1;
    margin-left: 10px;
  }
  .content {
    margin-left: 45px;
    border-radius: 20px 5px 20px 20px;
    background: #12b7f5;
    color: var(--grey-0);
  }
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.content {
  position: relative;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
  padding: 10px;
}
.nickname {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 5px;
}

.back-menu {
  font-size: 13px;
  border-radius: 2px;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  width: 80px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  display: none;
}
</style>