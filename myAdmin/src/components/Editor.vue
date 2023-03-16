<template>
  <div
    ref="editor"
    class="edit-container"
    v-html="innerText"
    :placeholder="placeholder"
    contenteditable
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      innerText: '',
      isLocked: false,
      range: null
    };
  },
  watch: {
    value:{
      immediate:true,
      handler(){
        if (!this.isLocked) {
        this.innerText = this.value;
      }
      }
      
    }
  },
  methods: {
    clear() {
      this.$el.innerHTML = "";
      this.$emit("input", this.$el.innerHTML);
    },
    onInput() {
      // console.log('input');
      this.$emit("input", this.$el.innerHTML);
    },
    onFocus() {
      console.log('onfocus');
      this.$emit("focus", this.$el.innerHTML);
      this.isLocked = true;
    },
    onBlur() {
      console.log('onblur');
      // 记录光标
      if (window.getSelection) {
        var selection = window.getSelection();
        this.range = selection.getRangeAt(0);
      }
      this.$emit("blur", this.$el.innerHTML);
      this.isLocked = false;
    },
    addText(value) {
      console.log('addtest');
      // 还原光标
      if (window.getSelection) {
        var selection = window.getSelection();
        selection.removeAllRanges();
        // 为空初始化光标
        if (this.range == null) {
          this.$refs.editor.focus();
          this.range = selection.getRangeAt(0);
        }
        // 删除选中内容
        this.range.deleteContents();
        // 添加内容
        this.range.insertNode(this.range.createContextualFragment(value));
        this.range.collapse(false);
        selection.addRange(this.range);
        this.$emit("input", this.$el.innerHTML);
      }
    }
  }
};
</script>

<style scoped>
.edit-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #f0f1f4;
  font-size: 14px;
  line-height: 1.5;
  padding: 6px 12px;
  box-sizing: border-box;
  overflow: auto;
  word-break: break-all;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  -webkit-user-modify: read-write-plaintext-only;
}
[contenteditable]:focus{
  outline: none;
}
.edit-container:empty::before {
  cursor: text;
  content: attr(placeholder);
  color: #999;
}
</style>
