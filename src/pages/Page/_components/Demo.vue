<template>
  <div class="list_box">
    <!-- 菜单左边 -->
    <div class="left">
      <scroll-view scroll-y="true" :style="{ height: scrollHeight }">
        <div
          class="item"
          v-for="(item, index) in leftArray"
          :key="index"
          :class="{ active: index == leftIndex }"
          :data-index="index"
          @tap="leftTap"
        >{{ item.id }}</div>
      </scroll-view>
    </div>
    <div class="main">
      <scroll-view
        scroll-y="true"
        :style="{ height: scrollHeight }"
        @scroll="mainScroll"
        :scroll-into-view="scrollInto"
        scroll-with-animation="true"
        @touchstart="mainTouch"
        id="scroll-el"
      >
        <block v-for="(item, index) in mainArray" :key="index">
          <div class="item" :id="'item-' + index">
            <div class="title">
              <div>{{ item.title }}</div>
            </div>
            <div class="goods" v-for="(item2, index2) in item.list" :key="index2">
              <!-- <image src="/static/logo.png" mode=""></image> -->
              <div>
                <div>第{{ index2 + 1 }}个商品标题</div>
                <div class="describe">第{{ index2 + 1 }}个商品的描述内容</div>
                <div class="money">第{{ index2 + 1 }}个商品的价格</div>
              </div>
            </div>
          </div>
        </block>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollHeight: "500px",
      leftArray: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        }
      ],
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      isMainScroll: false,
      scrollInto: "",
      tipsTop: "0px"
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: res => {
        /* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
        this.scrollHeight = `${res.windowHeight}px`;
        console.log("gaodu", res.windowHeight);
      }
    });
  },
  computed: {},
  mounted() {
    this.getListData();
  },
  methods: {
    /* 获取列表数据 */
    getListData() {
      /* 因无真实数据，当前方法模拟数据 */
      let [left, main] = [[], []];

      for (let i = 0; i < 8; i++) {
        left.push(`${i + 1}类商品`);

        let list = [];
        for (let j = 0; j < i + 1; j++) {
          list.push(j);
        }
        main.push({
          title: `第${i + 1}类商品标题`,
          list
        });
      }
      this.mainArray = main;

      this.$nextTick(() => {
        this.getElementTop();
      });
    },
    //获取距离顶部的高度
    getScrollTop(selector) {
      return new Promise((resolve, reject) => {
        let query = uni.createSelectorQuery().in(this);
        query
          .select(selector + "")
          .boundingClientRect(data => {
            resolve(data.top);
          })
          .exec();
      });
    },
    /* 获取元素顶部信息 */
    async getElementTop() {
      /* Promise 对象数组 */
      let p_arr = [];

      /* 遍历数据，创建相应的 Promise 数组数据 */
      for (let i = 0; i < this.mainArray.length; i++) {
        const resu = await this.getScrollTop(`#item-${i}`);
        p_arr.push(resu);
      }

      // console.log('p_arr', p_arr)

      /* 主区域滚动容器的顶部距离 */
      this.getScrollTop("#scroll-el").then(res => {
        let top = res;
        // #ifdef H5
        top += 43; //因固定提示块的需求，H5的默认标题栏是44px
        // #endif

        /* 所有节点信息返回后调用该方法 */
        Promise.all(p_arr).then(data => {
          console.log("滚动", data);
          this.tipsTop = `${data}px`;
          this.topArr = data;
        });
      });
    },

    /* 主区域滚动监听 */
    mainScroll(e) {
      if (!this.isMainScroll) {
        return;
      }
      let top = e.detail.scrollTop;
      let index = -1;

      if (top >= this.topArr[this.topArr.length - 1]) {
        index = this.topArr.length - 1;
      } else {
        index = this.topArr.findIndex((item, index) => {
          return this.topArr[index + 1] >= top;
        });
      }
      this.leftIndex = index < 0 ? 0 : index;
    },
    /* 主区域触摸 */
    mainTouch() {
      this.isMainScroll = true;
    },
    /* 左侧导航点击 */
    leftTap(e) {
      let index = e.currentTarget.dataset.index;
      this.isMainScroll = false;
      this.leftIndex = Number(index);
      this.scrollInto = `item-${index}`;
    }
  }
};
</script>

<style>
.list_box {
  width: 750px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  font-size: 28rpx;
}
.left {
  width: 200rpx;
  background-color: #f6f6f6;
  line-height: 80rpx;
  box-sizing: border-box;
  font-size: 32rpx;
}
.item {
  padding-left: 20rpx;
  position: relative;
}
.active {
  background-color: #ffffff;
  color: red;
}
.main {
  width: 500px;
  background-color: #fff;
  padding-left: 20rpx;
  width: 0;
  flex-grow: 1;
  box-sizing: border-box;
}
.tips {
  line-height: 64rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #666;
  height: 64rpx;
  position: fixed;
  top: 44px;
  right: 0;
  width: 530rpx;
  z-index: 10;
  background-color: #fff;
  padding-left: 10rpx;
}

.title {
  line-height: 64rpx;
  position: relative;
  font-size: 24rpx;
  font-weight: bold;
  color: #666;
  height: 64rpx;
}

.item {
  margin-bottom: 20rpx;
}

.goods {
  height: 200px;
  border-bottom: 2px solid #cccccc;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: 10rpx;
}
</style>
