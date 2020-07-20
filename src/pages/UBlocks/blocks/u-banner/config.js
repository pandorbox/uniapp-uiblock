export default {
  name: "幻灯片",
  blockTag: "Banner", // 块唯一标记
  attrs: {
    styleType: "default", // 风格类型(default:默认)
    iconSrc: "", // 图标资源地址
    iconSize: 30, // 图标大小
    fontSize: 30, // 字体大小
    textColor: "", // 文本颜色
    bgColor: "#fff", // 背景色
    width: "", // 宽度
    height: "", // 高度
    bdRadius: 0, // 圆角
    dataSchemeUrl: "data-scheme://", // 数据协议
    data: [
      {
        schemeUrl: "", // 协议
        imageSrc: "" // 图片地址
      }
    ]
  }
};
