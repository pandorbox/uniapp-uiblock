import BaseLogic, { Data as BaseData } from "@qjk/npm-pack/dist/core/base/BaseLogic";
import NetData from "./NData";
import User from "@qjk/npm-pack/dist/core/item/userInfo";

export class Data extends BaseData {
  /** web */
  web: boolean;
  constructor() {
    super();
    this.needLogin = false;
    this.web = false;
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
}
