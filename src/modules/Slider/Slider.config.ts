import {
  ComExposeEvents,
  ExposeApi,
  ExposeDefaultProps,
  ExposeFunctions,
} from "~/types/modules";

interface Config {
  exposeEvents?: ComExposeEvents;
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}

const config: Config = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
      name: "setData",
      description: "数据源",
      arguments: [
        {
          type: "array",
          name: "图片地址",
          describe: "填写图片地址",
          data: [],
          fieldName: "imageUrls",
        },
        {
          type: "array",
          name: "图片路径",
          describe: "与图片地址保持索引一致，为空时图片不可点击",
          data: [],
          fieldName: "imageLinks",
        },
      ],
    },
    {
      name: "setSlider",
      description: "设置",
      arguments: [
        {
          type: "boolean",
          name: "隐藏翻页箭头",
          describe: "是否隐藏左右翻页箭头",
          data: {
            comparableAverageA: "",
            comparableAverageB: "",
            method: "<",
          },
          fieldName: "navigation",
        },
        {
          type: "boolean",
          name: "隐藏底部导航",
          describe: "是否隐藏隐藏底部导航圆点",
          data: {
            comparableAverageA: "",
            comparableAverageB: "",
            method: "<",
          },
          fieldName: "pagination",
        },
        {
          type: "number",
          name: "延时",
          describe: "切换之间的延迟(毫秒),未指定此参数时将禁用自动播放!",
          data: "5000",
          fieldName: "delay",
        },
        {
          type: "boolean",
          name: "交互阻止播放",
          describe: "交互时打断自动播放",
          data: {
            comparableAverageA: "",
            comparableAverageB: "",
            method: "<",
          },
          fieldName: "disableOnInteraction",
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
      description: "初始化",
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
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "包裹器",
            value: "sliderWrap",
            children: [
              {
                title: "滑动页",
                value: "slideItem",
              },
              {
                title: "导航条",
                value: "pagination",
              },
              {
                title: "标记",
                value: "paginationBullet",
              },
              {
                title: "标记激活",
                value: "paginationBulletActive",
              },
              {
                title: "上一页",
                value: "prev"
              },
              {
                title: "下一页",
                value: "next"
              }
            ],
          },
        ],
      },
    ]
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

export default config;
