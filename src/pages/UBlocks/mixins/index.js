import * as URI from "uri-js";
import * as QueryString from "query-string";
// 创建一个需要混入的对象
export default {
  props: {
    /** 配置 */
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /** 块 */
    block: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    /** 块style */
    blockStyle() {
      if (!this.block) return {};
      return this.styles({
        backgroundColor: this.block.bgColor ? this.block.bgColor : "#fff",
        width: this.block.width ? this.block.width + "rpx" : "750rpx",
        height: this.block.height ? this.block.height + "rpx" : "null",
        borderRadius: this.block.bdRadius ? this.block.bdRadius + "rpx" : 0
      });
    },
    /**
     * 是否是Web
     */
    isWeb() {
      if (typeof window != "undefined") return true;
      return false;
    },
    /**
     * 是否是App
     */
    isApp() {
      if (typeof window != "undefined") return;
      if (typeof swan != "undefined" && swan) return;
      if (typeof wx != "undefined" && wx && wx.createUDPSocket) return;
      if (!uni || !uni.getSystemInfoSync || !uni.getSystemInfoSync().platform) {
        return false;
      }
      return true;
    }
  },
  created() {},
  methods: {
    onScheme(scheme) {
      console.log("onScheme:", scheme);
      this.$emit("scheme", scheme);
    },
    /**
     * 小数限制界限
     * @param {*} value 值
     * @param {*} min 最小值
     * @param {*} max 最大值
     * @param {*} defaultValue 默认值
     */
    boundFloat(value, min, max, defaultValue) {
      value = parseFloat(value || defaultValue || 0);
      if (value < min) return min;
      if (value > max) return max;
      return value;
    },
    /**
     * 整数限制界限
     * @param {*} value 值
     * @param {*} min 最小值
     * @param {*} max 最大值
     * @param {*} defaultValue 默认值
     */
    boundInt(value, min, max, defaultValue) {
      value = parseInt(value || defaultValue || 0);
      if (value < min) return min;
      if (value > max) return max;
      return value;
    },
    /**
     * 将对象转变为style字符串，对象属性的camel命名会转换为中划线命名
     * @param {*} obj
     */
    styles(obj) {
      let stylesStr = "";
      for (let styleName in obj) {
        if (obj.hasOwnProperty(styleName))
          stylesStr += `${styleName.replace(/([A-Z])/g, "-$1").toLowerCase()}:${this.adjustPx(obj[styleName])};`;
      }
      return stylesStr;
    },
    /**
     * 设计px转真实px
     * @param {*} designPx 设计px
     */
    designPxToActualPx(designPx) {
      if (!designPx) return 0;
      let actualPx = designPx / this.pixelRatio;
      return actualrpx;
    },
    adjustPx(str) {
      if (!this.isWeb || !window.isWebDesign) return str;
      if (/rpx/.test(str)) {
        let val = str.substring(0, str.indexOf("rpx"));
        if (val > 1) val = 0.5 * val;
        val = parseInt(val || 0);
        return `${val}px`;
      }
      return str;
    },
    /**参数说明：
     * 根据长度截取先使用字符串，超长部分追加…
     * str 对象字符串
     * len 目标字节长度
     * 返回值： 处理结果字符串
     */
    cutString(str, len) {
      if (!str || !len) return str;
      //length属性读出来的汉字长度为1
      if (str.length * 2 <= len) {
        return str;
      }
      var strlen = 0;
      var s = "";
      for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
          strlen = strlen + 2;
          if (strlen >= len) {
            return s.substring(0, s.length - 1) + "...";
          }
        } else {
          strlen = strlen + 1;
          if (strlen >= len) {
            return s.substring(0, s.length - 2) + "...";
          }
        }
      }
      return s;
    },
    /**
     * 获取数据适配器栏目
     * @param {*} schemeUrl
     */
    getDataAdapterSchemeUrlColumn(schemeUrl) {
      if (!schemeUrl) return "";
      let res = URI.parse(schemeUrl);
      if (!res || !res.scheme || res.scheme !== "mini-adapter-scheme" || !res.host || !res.query) return "";
      let query = QueryString.parse(res.query);
      if (!query || !query["column"]) return "";
      return query["column"];
    },
    /**
     * 获取数据值
     * @param dataPath 数据路径
     * @param defaultVal 默认值
     */
    val(dataPath, defaultVal) {
      let dDefaultVal = null;
      switch (typeof defaultVal) {
        case "boolean":
          dDefaultVal = defaultVal || false;
          break;
        case "number":
          dDefaultVal = defaultVal || 0;
          break;
        case "bigint":
          dDefaultVal = defaultVal || 0;
          break;
        case "string":
          dDefaultVal = defaultVal || "";
          break;
        case "function":
          dDefaultVal = defaultVal || null;
          break;
        case "object":
          dDefaultVal = defaultVal || {};
          break;
        default:
          dDefaultVal = defaultVal || {};
          break;
      }
      if (!dataPath) return dDefaultVal;
      let nodeKeys = dataPath.split(".");
      if (!nodeKeys || nodeKeys.length == 0) return dDefaultVal;
      let nodeData = {};
      for (let i = 0; i < nodeKeys.length; i++) {
        if (!nodeKeys[i]) return defaultVal;
        if (i == 0) {
          nodeData = this[nodeKeys[i]];
        } else {
          nodeData = nodeData[nodeKeys[i]];
        }
        if (!nodeData) return dDefaultVal;
      }
      return nodeData;
    }
  }
};
