import BaseLogic, { Data as BaseData } from "@qjk/npm-pack/dist/core/base/BaseLogic";
import NetData from "./NData";
import User from "@qjk/npm-pack/dist/core/item/userInfo";

export class Data extends BaseData {
  /** web */
  web: boolean;
  scrollInto: string;
  tabIndex: number;
  isScroll: boolean;
  constructor() {
    super();
    this.needLogin = false;
    this.web = false;
    this.scrollInto = "itemStart0";
    this.tabIndex = 0;
    this.isScroll = false;
  }
}

/**
 * 首页逻辑
 */
export default class Logic extends BaseLogic {
  data = new Data();
  netData = new NetData();
  constructor() {
    super();
  }
  async onBeingCreated() {}
  async onMenu(param: { index: number }) {
    this.data.isScroll = false;
    this.data.scrollInto = "itemStart" + param.index;
    this.data.tabIndex = param.index;
    this.refreshData();
  }
  async onScroll(param: { index: number }) {
    this.data.tabIndex = param.index;
    this.refreshData();
  }
  async onScrollTouch() {
    this.data.isScroll = true;
    this.refreshData();
  }
}
