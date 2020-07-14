export default {
  name: "区块渲染器",
  blockTag: "Render", // 块唯一标记
  attrs: {
    /** 配置 */
    config: {
      bgColor: "" // 背景颜色
    },
    /** 区块组 */
    blocks: []
  }
};
