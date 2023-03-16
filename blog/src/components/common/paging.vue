<template>
  <div class="paging">
    <!-- 上一页按钮-->
    <a @click="prePage" v-show="current > 1" class="ml-1 mr-1">上一页</a>
    <a @click="current = 1" :class="isChoose(0)" v-show="this.totalPage>1">1</a>
    <span v-show="pageStartAndEnd.start - 1 > 1">...</span>
    <a
      v-for="(i, index) in pageStartAndEnd.end"
      :key="i"
      class="ml-1 mr-1"
      @click="changePeplyCurrent(i)"
      v-show="index >= pageStartAndEnd.start - 1"
      :class="isChoose(index)"
      >{{ i }}</a
    >
    <span v-show="pageStartAndEnd.end + 1 < totalPage">...bb</span>
    <!-- {{ pre }}{{ after }} -->
    <!-- {{pageStartAndEnd}} -->
    <a @click="current = totalPage" :class="isChoose(this.totalPage - 1)" v-show="this.totalPage>1">{{
      totalPage
    }}</a>
    <!-- 下一页按钮 最后一页不显示 -->
    <a @click="nextPage" v-show="current < totalPage" class="ml-1 mr-1">
      下一页
    </a>
    <span v-show="this.totalPage>1">共{{ totalPage }}页</span>
  </div>
</template>

<script>
export default {
  props: {
    id:{
      type:Number,
    },
    replyCount: {
      type: Number,
    },
    size: {
      type: Number,
    },
    continue: {
      type: Number,
    },
  },
  data() {
    return {
      // pre: [],
      // after: [],
      current: 1,
      // totalPage: 5,
      // pageSize: 6,
      // continue: 3,
    };
  },
  methods: {
    prePage() {
      this.current--;
    },
    changePeplyCurrent(i) {
      this.current = i;
      //   alert("第" + i + "页");
    },
    nextPage() {
      this.current++;
    },
  },
  mounted() {
    // 2.禁止选中文字
    window.addEventListener("selectstart", function (e) {
      e.preventDefault();
    });
  },

  watch: {
    current: {
      immediate: false,
      handler(newValue) {
        // console.log(newValue);
        console.log(this.id);
          this.$emit('currentChange',newValue,this.id)
        
      },
    },
  },
  computed: {
    totalPage(){
      // console.log(this.replyCount,this.size);
      let size=Math.ceil(this.replyCount/this.size)
      // console.log(size);
      return size
    },
    pageStartAndEnd() {
      if(this.totalPage<=1){
        // console.log(111);
        return []
      }
      let arr = {
        start: 0,
        end: 0,
        current: this.current,
      };
      // console.log(arr,this.totalPage);
      if (this.current <= this.continue) {
        arr.start = 2;
      } else if (
        this.current > this.continue &&
        this.current <= this.totalPage - this.continue + 1
      ) {
        arr.start = this.current - Math.floor(this.continue / 2);
      } else {
        arr.start = this.totalPage + 1 - this.continue;
      }
      if (this.current <= this.totalPage - this.continue + 1) {
        arr.end = arr.start + this.continue - 1;
      } else {
        arr.end = this.totalPage - 1;
      }
      // console.log(arr);
      return arr;
    },
    isChoose() {
      return (index) => {
        // console.log(index);
        if (this.current - 1 === index) {
          // console.log(index);
          return "select";
        } else {
          return "";
        }
      };
    },
  },
  beforeDestroy() {
    window.removeEventListener("selectstart",()=>{});
  },
};
</script>
<style scoped>
.select {
  color: skyblue !important;
}

</style>