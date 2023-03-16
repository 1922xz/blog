<template>
  <div>
    <div class="banner-center">
      <h2>分类</h2>
    </div>
    <div class="blog-container">
      <h2 class="lineTitle">目前共有{{ count }}个分类</h2>
      <ul class="lineList">
        <li v-for="item of categoryList" :key="item.id">
          <div class="listItemTitle">
            <router-link :to="'/categories/' + item.id">
              <h2>
                <span style="border-bottom: 2px dashed #ccc">{{
                  item.categoryName
                }}</span
                ><span style="color: #ccc; margin: auto 3px"
                  >({{ item.articleCount }})</span
                >
              </h2>
            </router-link>
          </div>
          <ul>
            <li class="listItem">
              <a href="#">afaaaaaaaaaaaaaaaaaaaaaaaaaaa</a>
            </li>
            <li class="listItem">
              <a href="#">ddddddddddddddddddddddddddvdf</a>
            </li>
            <li class="listItem">
              <a href="#">dgggggggggggggggggggggggggggg</a>
            </li>
            <li class="listItem">
              <a href="#">我i和覅回复呢哦iv和飞机哦sdssdf</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCategory } from "@/api/article";
export default {
  mounted() {
    this.getListCategories();
  },
  data() {
    return {
      count: 0,
      categoryList: [],
    };
  },
  methods: {
    getListCategories() {
      getCategory().then((res) => {
        this.categoryList = res.recordList;
        this.count = res.count;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.blog-container {
  .lineTitle,
  .listItemTitle,
  .listItem {
    position: relative;
    &::before {
      position: absolute;
      left: -20px;
      top: 20%;
      display: inline-block;
      content: "";
      border: 2px solid #e9546b;
      background-color: var(--grey-0);
      z-index: 1;
      border-radius: 50%;
      width: 16px;
      height: 16px;
    }
  }
  .listItemTitle,
  .listItem:not(:last-child) {
    &::after {
      position: absolute;
      content: "";
      display: inline-block;
    }
  }
  .lineTitle {
    margin-bottom: 46px;
    padding-left: 32px;
    &::before {
      left: 1px;
      top: 27%;
      width: 20px;
      height: 20px;
    }
  }
  .listItemTitle {
    padding-left: 12px;
    margin-bottom: 36px;
    &::after {
      height: 175%;
      border-left: 3px dashed pink;
      left: -15px;
      bottom: -47px;
    }
    &::before {
      left: -22px;
      top: 35%;
    }
  }

  .lineList {
    padding-left: 12px;

    li {
      padding-left: 12px;
      margin-bottom: 64px;
      .listItem {
        a{
          color: #e9546b;
          font-size: 18px;
        }
        line-height: 2;
        margin-bottom: 20px;
        border-left: 0px;
        &::before {
          left: -19px;
          top: 11px;
          width: 0px;
          height: 0px;
          border: 5px solid red;
        }
      }
      .listItem:not(:last-child)::after {
        height: 155%;
        border-left: 3px solid pink;
        left: -15px;
        bottom: -32px;
      }
    }
  }

  .lineList li .listItem,
  .listItemTitle {
    &:hover {
      a {
        color: skyblue;
      }
      &::before {
        border-color: skyblue;
      }
    }
  }
}
</style>