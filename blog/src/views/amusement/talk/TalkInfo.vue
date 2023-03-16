<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
    <!-- 说说内容 -->
    <v-card class="blog-container">
      <div class="talk-wrapper">
        <talkCard :item='this.talkInfo'/>
      </div>
      <Comment :type="commentType"/>
    </v-card>
  </div>
</template>

<script>
import Comment from "@/components/comment/index.vue"
import talkCard from './talkCard.vue'
export default {
  components:{
    Comment,
    talkCard
  },
  created() {
    this.getTalkById();
  },
  data() {
    return {
      commentType: 3,
      commentCount: 0,
      talkInfo: {},
      previewList: [],
    };
  },
  methods: {
    getTalkById() {
      this.axios
        .get("http://localhost:3008/api/talks/" + this.$route.params.talkId)
        .then((data) => {
          console.log(data);
          this.talkInfo = data[0];
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
<style scope>
.talk-wrapper {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}
.talk-wrapper:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}

</style>