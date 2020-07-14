import BaseLogic, { Data as BaseData } from "@qjk/npm-pack/dist/core/base/BaseLogic";
import NetData from "./NData";
import User from "@qjk/npm-pack/dist/core/item/userInfo";
import Udata from "./Data";
import Block from "../Blocks/block";
export class Data extends BaseData {
  /** web */
  web: boolean;
  /** Udata */
  uData: Array<Block>;
  constructor() {
    super();
    this.needLogin = false;
    this.web = false;
    this.uData = [];
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
  async onBeingCreated() {
    this.data.uData = [...Udata.blocks];
  }
}
