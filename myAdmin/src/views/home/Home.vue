<template>
  <div>
    <!-- 统计数据 -->
    <el-row :gutter="30" class="accountCard">
      <el-col :span="6" v-for="(item, index) in this.accountData" :key="index">
        <el-card>
          <div class="card-icon-container">
            <i :class="item.iconClass" :style="item.iconStyle" />
          </div>
          <div class="card-desc">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-count">{{ item.count }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 一周访问量展示 -->
    <el-card style="margin-top: 1.25rem">
      <div class="e-title">一周访问量</div>
      <div ref="viewCount" v-loading="loading" class="chart" />
    </el-card>
    <!-- 文章贡献统计 -->
    <el-card style="margin-top: 1.25rem">
      <div class="e-title">文章贡献统计</div>
      <div v-loading="loading">
        <calendar-heatmap
          :end-date="new Date()"
          :values="articleStatisticsList"
          no-data-text="nothsday"
          :tooltip="true"
          tooltip-unit="点赞"
          :vertical="false"
        />
      </div>
    </el-card>
    <el-row :gutter="20" style="margin-top: 1.25rem" class="chartLine">
      <!-- 文章浏览量排行 -->
      <el-col :span="16">
        <el-card>
          <div class="e-title">文章浏览量排行</div>
          <div class="chart" ref="articleRank" v-loading="loading" />
        </el-card>
      </el-col>
      <!-- 分类数据统计 -->
      <el-col :span="8">
        <el-card>
          <div class="e-title">文章分类统计</div>
          <div class="chart" ref="category" v-loading="loading" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1.25rem">
      <!-- 用户地域分布 -->
      <el-col :span="16">
        <el-card>
          <div class="e-title">用户地域分布</div>
          <div class="chart" v-loading="loading">
            <div class="area-wrapper">
              <el-radio-group v-model="type">
                <el-radio :label="1">用户</el-radio>
                <el-radio :label="2">游客</el-radio>
              </el-radio-group>
            </div>
            <div ref="userAreaMap" class="chart" />
          </div>
        </el-card>
      </el-col>
      <!-- 文章标签统计 -->
      <el-col :span="8">
        <el-card>
          <div class="e-title">文章标签统计</div>
          <div class="chart tagAccount" v-loading="loading">
            <tag-cloud style="margin-top: 1.5rem" :data="tagDTOList" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "../../assets/js/china.js";
import { CalendarHeatmap } from "vue-calendar-heatmap";
export default {
  data() {
    return {
      tagDTOList: [
        {
          id: 1,
          name: "11we",
        },
        {
          id: 2,
          name: "ferf",
        },
        {
          id: 3,
          name: "defe",
        },
        {
          id: 4,
          name: "frefr",
        },
        {
          id: 5,
          name: "dfefg",
        },
        {
          id: 6,
          name: "11we",
        },
        {
          id: 7,
          name: "ferf",
        },
        {
          id: 8,
          name: "defe",
        },
        {
          id: 9,
          name: "frefr",
        },
        {
          id: 10,
          name: "dfefg",
        },
        {
          id: 11,
          name: "11we",
        },
        {
          id: 12,
          name: "ferf",
        },
        {
          id: 13,
          name: "defe",
        },
        {
          id: 14,
          name: "frefr",
        },
        {
          id: 15,
          name: "dfefg",
        },
      ],
      type: 1,
      loading: true,
      viewCount: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        color: ["#3888fa"],
        legend: {
          data: ["访问量"],
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          data: [
            "2022-10-15",
            "2022-10-15",
            "2022-10-15",
            "2022-10-15",
            "2022-10-15",
          ],
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: "#666",
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#048CCE",
            },
          },
        },
        series: [
          {
            name: "访问量",
            type: "line",
            data: [1, 4, 2, 3, 2],
            smooth: true,
          },
        ],
      },
      accountData: [
        {
          iconClass: ["iconfont", "el-icon-myfangwenliang"],
          iconStyle: "color:#40C9C6",
          title: "访问量",
          count: 111,
        },
        {
          iconClass: ["iconfont", "el-icon-myuser"],
          iconStyle: "color:#34BFA3",
          title: "用户量",
          count: 234,
        },
        {
          iconClass: ["iconfont", "el-icon-mywenzhang-copy"],
          iconStyle: "color:#F4516C",
          title: "文章量",
          count: 32,
        },
        {
          iconClass: ["el-icon-s-comment"],
          iconStyle: "color:#36A3F7",
          title: "留言量",
          count: 555,
        },
      ],
      articleRank: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        color: ["#58AFFF"],
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          data: [1, 2, 3, 4, 5],
        },
        yAxis: {},
        series: [
          {
            name: ["浏览量"],
            type: "bar",
            data: [1, 2, 3, 4, 5],
          },
        ],
      },
      category: {
        color: [
          "#7EC0EE",
          "#FF9F7F",
          "#FFD700",
          "#C9C9C9",
          "#E066FF",
          "#C0FF3E",
        ],

        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "文章分类",
            type: "pie",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
              { value: 122, name: "aaa" },
            ],
          },
        ],
        media: [
          {
            option: {
              legend: {
                left: "center",
                bottom: 0,
                orient: "horizontal",
              },
              series: [
                {
                  roseType: "radius",
                  center: ["50%", "45%"],
                },
              ],
            },
          },
          {
            query: {
              maxWidth: 325,
            },
            option: {
              legend: {
                right: -2, // legend 放置在右侧中间。
                top: "-1%",
                orient: "vertical", // 纵向布局。
              },
              series: [
                {
                  center: ["25%", "50%"],
                  radius: ["40%", "70%"],
                  label: {
                    normal: {
                      show: false,
                      position: "center",
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                },
              ],
              tooltip: {
                trigger: "item",
                position: function (p) {
                  //其中p为当前鼠标的位置
                  return [p[0] + 30, p[1] - 40];
                },
                extraCssText: "width:160px;height:50px;",
                //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
              },
            },
          },
        ],
      },
      articleStatisticsList: [
        { date: "2022-9-21", count: 6 },
        { date: "2022-9-24", count: 60 },
        { date: "2022-8-22", count: 16 },
        { date: "2022-8-23", count: 26 },
        { date: "2022-7-23", count: 36 },
        { date: "2022-6-22", count: 46 },
      ],
      userAreaMap: {
        tooltip: {
          formatter: function (e) {
            var value = e.value ? e.value : 0;
            return e.seriesName + "<br />" + e.name + "：" + value;
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          right: 26,
          bottom: 40,
          showLabel: !0,
          pieces: [
            {
              gt: 100,
              label: "100人以上",
              color: "#ED5351",
            },
            {
              gte: 51,
              lte: 100,
              label: "51-100人",
              color: "#59D9A5",
            },
            {
              gte: 21,
              lte: 50,
              label: "21-50人",
              color: "#F6C021",
            },
            {
              label: "1-20人",
              gt: 0,
              lte: 20,
              color: "#6DCAEC",
            },
          ],
          show: !0,
        },
        geo: {
          map: "china",
          zoom: 1.2,
          layoutCenter: ["10%", "10%"], //地图中心在屏幕中的位置
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#F5DEB3",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "用户人数",
            type: "map",
            geoIndex: 0,
            data: [
              { name: "北京", value: this.randomData() },
              { name: "天津", value: this.randomData() },
              { name: "上海", value: this.randomData() },
              { name: "重庆", value: this.randomData() },
              { name: "河北", value: this.randomData() },
              { name: "河南", value: this.randomData() },
              { name: "云南", value: this.randomData() },
              { name: "辽宁", value: this.randomData() },
              { name: "黑龙江", value: this.randomData() },
              { name: "湖南", value: this.randomData() },
              { name: "安徽", value: this.randomData() },
              { name: "山东", value: this.randomData() },
              { name: "新疆", value: this.randomData() },
              { name: "江苏", value: this.randomData() },
              { name: "浙江", value: this.randomData() },
              { name: "江西", value: this.randomData() },
              { name: "湖北", value: this.randomData() },
              { name: "广西", value: this.randomData() },
              { name: "甘肃", value: this.randomData() },
              { name: "山西", value: this.randomData() },
              { name: "内蒙古", value: this.randomData() },
              { name: "陕西", value: this.randomData() },
              { name: "吉林", value: this.randomData() },
              { name: "福建", value: this.randomData() },
              { name: "贵州", value: this.randomData() },
              { name: "广东", value: this.randomData() },
              { name: "青海", value: this.randomData() },
              { name: "西藏", value: this.randomData() },
              { name: "四川", value: this.randomData() },
              { name: "宁夏", value: this.randomData() },
              { name: "海南", value: this.randomData() },
              { name: "台湾", value: this.randomData() },
              { name: "香港", value: this.randomData() },
              { name: "澳门", value: this.randomData() },
            ],
            areaColor: "#0FB8F0",
          },
        ],

      },
    };
  },
  components: {
    CalendarHeatmap,
  },
  methods: {
    randomData() {
      return Math.round(Math.random() * 60);
    },
  },
  mounted() {
    this.loading = false;
    echarts.init(this.$refs.viewCount).setOption(this.viewCount);
    echarts.init(this.$refs.articleRank).setOption(this.articleRank);
    echarts.init(this.$refs.category).setOption(this.category);
    echarts.init(this.$refs.userAreaMap).setOption(this.userAreaMap);
    let that = this;
    window.addEventListener("resize", function () {
      console.log(111);
      echarts.init(that.$refs.viewCount).resize();
      echarts.init(that.$refs.articleRank).resize();
      echarts.init(that.$refs.category).resize();
      echarts.init(that.$refs.userAreaMap).resize();
    });
  },
};
</script>
<style scope>
@media (max-width: 759px) {
  .accountCard {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-right: 5px;
  }
  .el-col-6 {
    width: 48%;
  }
  .el-card__body {
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-col-6:nth-child(n + 3) {
    margin-top: 10px;
  }
  .chart {
    height: 150px;
    width: 100%;
  }
  .tagAccount {
    height: 120%;
  }
  .chartLine {
    display: flex;
    flex-direction: column;
  }
  .el-col-16 {
    width: 100%;
  }
  .el-col-8 {
    width: 100%;
  }
}
@media (min-width: 760px) {
  .chart {
    height: 350px;
    width: 100%;
  }
}
.card-icon-container {
  display: inline-block;
  font-size: 3rem;
}
.card-desc {
  font-weight: bold;
  float: right;
}
.card-title {
  margin-top: 0.3rem;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1rem;
}
.card-count {
  margin-top: 0.75rem;
  color: #666;
  font-size: 1.25rem;
}
.e-title {
  font-size: 13px;
  color: #202a34;
  font-weight: 700;
}
.area-wrapper {
  display: flex;
  justify-content: center;
}
</style>