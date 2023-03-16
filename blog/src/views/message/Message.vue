<template>
  <div>
    <div class="message-banner">
      <!-- 弹窗输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input
            placeholder="说点什么吧"
            @click="show = true"
            v-model="messageContent"
            @keyup.enter="addToList"
          />
          <button
            class="ml-3 animated bounceInLeft"
            v-show="show"
            @click="addToList"
          >
            发送
          </button>
        </div>
      </div>
      <div class="barrage-container">
        <vue-baberrage :barrageList="barrageList">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                :src="slotProps.item.avatar"
                width="30"
                height="30"
                style="border-radius: 50%"
              />
              <span class="ml-2">{{ slotProps.item.nickname }} :</span>
              <span class="ml-2">{{ slotProps.item.messageContent }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import {getMessage,sendMessage} from '@/api/message.js'
export default {
  mounted() {
    this.listMessage();
  },
  data() {
    return {
      barrageList: [],
      show: false,
      messageContent: "",
    };
  },
  methods: {
    listMessage() {
      getMessage().then((res) => {
        console.log(res);
        this.barrageList = res.messages;
      });
    },
    addToList() {
      if (this.messageContent.trim() == "") {
        this.$toast({ type: "error", message: "留言不能为空" });
        return false;
      }
      const userAvatar = this.$store.state.avatar
        ? this.$store.state.avatar
        : '';
      const userNickname = this.$store.state.nickname
        ? this.$store.state.nickname
        : "游客";
      var message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * (10 - 7)) + 7,
      };
      this.messageContent = "";
      sendMessage(message)
        .then((data) => {
          if (data.flag) {
            this.barrageList.push(message);
            this.$toast({ type: "success", message: "留言成功" });
          } else {
            this.$toast({ type: "error", message: data.message });
          }
        });
    },
  },
};
</script>
<style scoped>
.message-banner {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  z-index: 99;
  background-color: #49b1f5;
  animation: header-effect 1s;
}
.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: var(--grey-0);
}
.message-title {
  color: #eee;
  animation: title-scale 1s;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: var(--grey-0) 1px solid;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: var(--grey-0);
}
.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: var(--grey-0) 1px solid;
}
.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% -50px);
  width: 100%;
}
.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 50px;
  color: var(--grey-0);
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>