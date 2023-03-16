<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <div class="talk-container">
      <!-- 输入框 -->
      <Editor
        class="editor-wrapper"
        placeholder="说点什么吧"
        ref="editor"
        v-model="talk.content"
      />
      <!-- 操作菜单 -->
      <div class="operation-wrapper">
        <div class="left-wrapper">
          <el-popover placement="bottom-start" width="460" trigger="click">
            <span
              :key="index"
              class="emoji-item"
              @click="addEmoji(key, value)"
              v-for="(value, key, index) of emojiList"
            >
              <img
                :src="value"
                :title="key"
                width="24"
                height="24"
                class="emoji"
              />
            </span>
            <i
              class="iconfont el-icon-mybiaoqing operation-btn"
              slot="reference"
            />
          </el-popover>
          <el-upload
            list-type="picture-card"
            action="https://up.qiniup.com"
            :before-upload="beforeUpload"
            :http-request="upqiniu"
            multiple
            :show-file-list="false"
            :file-list="photoList"
            :on-change="changeFileList"
            :on-remove="handleRemove"
          >
            <i class="iconfont el-icon-mytupian operation-btn" />
          </el-upload>
        </div>
        <div class="right-wrapper">
          <!-- 是否置顶 -->
          <el-switch
            v-model="talk.isTop"
            style="margin-right: 16px"
            inactive-text="置顶"
            :active-value="1"
            :inactive-value="0"
          />
          <!-- 说说状态 -->
          <el-dropdown
            trigger="click"
            @command="handleCommand"
            style="margin-right: 16px"
          >
            <span class="talk-status">
              {{ dropdownTitle }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) of statusList"
                :key="index"
                :command="item.status"
              >
                {{ item.desc }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            type="primary"
            size="small"
            @click="saveOrUpdateTalk"
            :disabled="talk.content == ''"
          >
            发布
          </el-button>
        </div>
      </div>
      <el-upload
        v-show="photoList.length > 0"
        ref="upload"
        action="https://up.qiniup.com"
        list-type="picture-card"
        :before-upload="beforeUpload"
        :http-request="upqiniu"
        :file-list="photoList"
        multiple
        :on-remove="handleRemove"
        :on-change="changeFileList"
      >
        <i class="el-icon-plus talk-image-upload" />
      </el-upload>
    </div>
  </el-card>
</template>

<script>
import Editor from "../../components/Editor.vue";
import EmojiList from "../../assets/js/emoji";
export default {
  components: { Editor },
  data() {
    return {
      emojiList: EmojiList,
      uploadImg: "",
      talk: {
        isTop: 0,
        content: "",
        status: 1,
      },
      statusList: [
        { status: 1, desc: "公开" },
        { status: 2, desc: "私密" },
      ],
      photoList: [],
    };
  },
  methods: {
    async upqiniu(req) {
      // console.log(req);
      await this.$store.dispatch("uploadImg", req.file).then((res) => {
        if (res) {
          req.onSuccess();
          for (let i of this.photoList) {
            // console.log(i.url);
            if (i.url.indexOf("blob") != -1) {
              i.url = res;
            }
          }
        }
      });
    },
    changeFileList(file) {
      this.$refs.upload.clearFiles(); //清除文件对象
      // console.log(file);
      this.photoList.push({ url: file.url });
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file) {
      // console.log(file);
      this.photoList.forEach((item, index) => {
        if (item.url == file.url) {
          this.photoList.splice(index, 1);
        }
      });
    },
    handleCommand(command) {
      this.talk.status = command;
    },
    saveOrUpdateTalk() {
      if (this.talk.content.trim() == "") {
        this.$message.error("说说内容不能为空");
        return false;
      }
      let imgList = [];
      this.photoList.forEach((item) => {
        imgList.push(item.url);
      });
      if (imgList.length > 0) {
        this.talk.images = JSON.stringify(imgList);
      }
      this.axios
        .post("http://localhost:3008/api/admin/talks", this.talk)
        .then(({ data }) => {
          if (data.flag) {
            this.$refs.editor.clear();
            // this.photoList = [];
            this.$notify.success({
              title: "成功",
              message: data.message,
            });
          } else {
            this.$notify.error({
              title: "失败",
              message: data.message,
            });
          }
        });
    },
    getImgUrl(imgurl) {
      this.uploadList.push({
        url: imgurl,
      });
    },
    addEmoji(key, value) {
      this.$refs.editor.addText(
        "<img src= '" +
          value +
          "' width='24'height='24' alt=" +
          key +
          " style='margin: 0 1px;vertical-align: text-bottom'/>"
      );
    },
  },
  mounted() {
    let id = this.$route.params.talkId;
    if (id) {
      this.axios
        .get("http://localhost:3008/api/talks", {
          params: {
            id,
          },
        })
        .then(({ data }) => {
          console.log(data.data);
          this.talk = data.data.recordList[0];
          this.photoList = this.talk.images.map((item) => {
            return {
              url: item,
            };
          });
        });
    }
  },
  watch: {
    talk(newvalue) {
      console.log(newvalue);
    },
    uploadList: {
      deep: true,
      handler(value) {
        console.log(value);
      },
    },
  },
  computed: {
    dropdownTitle() {
      let desc = this.statusList.find((e) => {
        return e.status == this.talk.status;
      }).desc;
      return desc;
    },
  },
};
</script>
<style scoped>
.talk-container {
  margin-top: 40px;
}
.editor-wrapper {
  max-height: 150px;
  min-height: 150px;
}
.operation-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.operation-btn {
  cursor: pointer;
  color: #838383;
  font-size: 20px;
  margin-right: 12px;
}
.uploadImg {
  position: absolute;
  top: 232px;
  left: 50px;
}
.left-wrapper {
  display: flex;
  width: 50%;
}
.talk-image-upload {
  margin-top: 8px;
}
.emoji-item {
  cursor: pointer;
  display: inline-block;
}
.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}
.emoji {
  user-select: none;
  margin: 0.25rem;
  display: inline-block;
  vertical-align: middle;
}
::v-deep.left-wrapper .el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  box-sizing: border-box;
  width: 0px;
  height: 0px;
  line-height: 0px;
  vertical-align: top;
}
</style>