<template>
  <div>
    <div class="banner-center">
      <h1>归档</h1>
    </div>
    <v-card class="blog-container">
      <v-timeline :align-top="true" :dark="false" :dense="false" :light="false">
        <v-timeline-item
        :right="true"
          :hide-dot="true"
          v-for="item of archiveList"
          :key="item.id"
          >
          <span class="time" slot="opposite">{{ item.createTime | date }}</span>
          <router-link
            :to="'/articles/' + item.id"
            style="color: #666; text-decoration: none"
            ><h4 style="display:inline-block;margin-right:10px">{{ item.articleTitle }}</h4></router-link
          ></v-timeline-item
        >
      </v-timeline>
      <timeline>
        <timeline-title>目前共计{{ count }}篇文章，继续加油</timeline-title>
        <timeline-item bg-color="#9dd8e0"> </timeline-item>
      </timeline>
      <v-pagination
        color="#00C4B6"
        v-model="current"
        :length="Math.ceil(count / 10)"
        total-visible="7"
      />
    </v-card>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
import { getArchive } from "@/api/article";
export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
  },
  data() {
    return {
      count: 0,
      current: 1,
      archiveList: [],
      cover: "",
    };
  },
  mounted() {
    this.getListArchives();
  },
  methods: {
    getListArchives(value = this.current) {
      getArchive({ current: value }).then((res) => {
        // console.log(res);
        this.count = res.count;
        this.archiveList = res.recordList;
      });
    },
  },
  watch: {
    current(value) {
      this.getListArchives(value);
    },
  },
};
</script>
<style scoped lang='scss'>
.v-pagination__item,
.v-pagination__item--active {
  background-color: rgb(0, 196, 182);
  border: none;
}
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
.theme--light.v-timeline:before {
  background: pink;
}
.v-timeline:before {
  width: 3px;
}
::v-deep.v-timeline-item .v-timeline-item__body:before {
  content: "";
  position: relative;
  left: -54px;
  display: inline-block;
  background-color: var(--grey-0);
  // width: 10px;
  // height: 10px
  padding: 4px;
  border-radius: 50%;
  border: 3px solid rgba($color: red, $alpha: 0.5);
}
</style>