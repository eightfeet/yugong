import {
  ComExposeEvents,
  ExposeApi,
  ExposeDefaultProps,
  ExposeFunctions,
} from "~/types/modules";

interface StaticConstants {
  exposeEvents?: ComExposeEvents;
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}

const staticConstants: StaticConstants = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
      name: "setSlider",
      description: "Slider 设置",
      arguments: [
        {
          type: "number",
          name: "navigation",
          describe: "隐藏导航!0隐藏,1不隐藏",
          data: "1",
          fieldName: "navigation",
        },
        {
          type: "number",
          name: "pagination",
          describe: "隐藏分页!0隐藏,1不隐藏",
          data: "1",
          fieldName: "pagination",
        },
        {
          type: "number",
          name: "delay",
          describe: "切换之间的延迟(毫秒),未指定此参数时将禁用自动播放!",
          data: "5000",
          fieldName: "delay",
        },
        {
          type: "number",
          name: "disableOnInteraction",
          describe: "交互时打断自动播放!0打断,1不打断",
          data: "0",
          fieldName: "disableOnInteraction",
        },
      ],
    },
    {
      name: "setData",
      description: "Slider 数据源",
      arguments: [
        {
          type: "array",
          name: "imageUrls",
          describe: "图片地址",
          data: [],
          fieldName: "imageUrls",
        },
        {
          type: "array",
          name: "imageLinks",
          describe: "与图片地址保持索引一致空值图片不可点击",
          data: [],
          fieldName: "imageLinks",
        },
      ],
    },
  ],

  /**
   * 发布事件的静态描述
   */
  exposeEvents: [
    {
      name: "mount",
      description: "挂载",
    },
    {
      name: "unmount",
      description: "卸载",
    },
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    layout: {
      w: 4, // 宽
      h: 4, // 高
    },
    style: {
      // 基础
      basic: {},
      // 滑动包裹器
      sliderWrap: {},
      // 滑动页
      slideItem: {},
      // 导航
      pagination: {},
      // 导航按钮
      paginationBullet: {},
      // 导航按钮激活
      paginationBulletActive: {},
      // 上一页
      prev: {},
      // 下一页
      next: {},
    },
    styleDescription: {
      sliderWrap: "包裹器",
      slideItem: "滑动页",
      pagination: "导航条",
      paginationBullet: "标记",
      paginationBulletActive: "标记激活",
      prev: "上一页",
      next: "下一页",
    },
  },

  /**
   * 发布默认porps
   */
  exposeApi: [
    {
      apiId: "init",
      name: "初始化数据",
    },
  ],
};

export default staticConstants;
