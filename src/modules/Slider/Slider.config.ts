import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
      name: "setData",
      description: "数据源",
      arguments: [
        {
          type: "mixed",
          name: "内容",
          describe: "填写图片地址",
          fieldName: "imageUrls",
          data: [
            {
              "background": "#fff",
              "childrens": [
                {
                  "content": "这是P1元素1",
                  "style": {},
                  "parallax": {
                    "x": "100",
                    "y": "100",
                    "scale": "1.5",
                    "opacity": "0",
                    "duration": "0"
                  },
                  "link": "2"
                },
                {
                  "content": "这是P1元素2",
                  "style": {},
                  "parallax": {
                    "x": "100",
                    "y": "100",
                    "scale": "1.5",
                    "opacity": "0",
                    "duration": "1000"
                  }
                }
              ]
            },
            {
              "background": "#fff",
              "childrens": [
                {
                  "content": "这是P2元素1",
                  "style": {},
                  "parallax": {
                    "x": "100",
                    "y": "100",
                    "scale": "1.5",
                    "opacity": "0",
                    "duration": "0"
                  }
                },
                {
                  "content": "这是P2元素2",
                  "style": {},
                  "parallax": {
                    "x": "100",
                    "y": "100",
                    "scale": "1.5",
                    "opacity": "0",
                    "duration": "1000"
                  }
                }
              ]
            }
          ]
        },
      ],
    },
    {
      name: "setSlider",
      description: "设置",
      arguments: [
        {
          type: "string",
          name: "转场效果",
          describe: "滚动时转场效果,slider1 - slider10",
          select: {
            slider1: "转场1", slider2: "转场2", slider3: "转场3", slider4: "转场4", slider5: "转场5",
            slider6: "转场6", slider7: "转场7", slider8: "转场8", slider9: "转场9", slider10: "转场10",
          },
          data: "slider1",
          fieldName: "effect",
        },

        {
          type: "string",
          name: "方向",
          describe: "手势的方向,horizontal: 横向; vertical: 纵向",
          select: {
            horizontal: "横向", vertical: "纵向"
          },
          data: "horizontal",
          fieldName: "direction",
        },
        {
          type: "number",
          name: "隐藏翻页箭头",
          describe: "是否隐藏左右翻页箭头",
          select: {
            1: "隐藏",
            2: "不隐藏"
          },
          data: "2",
          fieldName: "navigation",
        },
        {
          type: "number",
          name: "隐藏导航",
          describe: "是否隐藏隐藏底部导航圆点",
          select: {
            1: "隐藏",
            2: "不隐藏"
          },
          data: "2",
          fieldName: "pagination",
        },
        {
          type: "number",
          name: "自动播放间隔",
          describe: "切换之间的延迟(毫秒),未指定此参数时将禁用自动播放!",
          data: "",
          fieldName: "delay",
        },
        {
          type: "number",
          name: "速度",
          describe: "单页切换速度",
          data: "500",
          fieldName: "speed",
        },
        {
          type: "number",
          name: "交互阻止播放",
          describe: "交互时打断自动播放",
          select: {
            1: "阻止",
            2: "不阻止"
          },
          data: "1",
          fieldName: "disableOnInteraction",
        },
        {
          type: "number",
          name: "循环播放",
          describe: "是否循环播放1:是,2:否",
          select: {
            1: "是",
            2: "否"
          },
          data: "1",
          fieldName: "loop",
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
    {
      name: "onLastOneStart",
      description: "进入最后一页",
    }
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    layout: {
      w: 10, // 宽
      h: 5, // 高
    },
    style: {
      // 基础
      basic: {},
      // 滑动包裹器
      sliderWrap: {},
      // 内容
      content: {},
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
      prevarrow: {},
      nextarrow: {},
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
                children: [
                  {
                    title: "页面内容",
                    value: "content",
                  }
                ]
              },
              {
                title: "导航条",
                value: "pagination",
                children: [
                  {
                    title: "导航标记",
                    value: "paginationBullet",
                  },
                  {
                    title: "导航标记激活",
                    value: "paginationBulletActive",
                  },
                ]
              },
              {
                title: "上一页",
                value: "prev",
                children: [
                  {
                    title: "字符箭头",
                    value: "prevarrow",
                  },
                ]
              },
              {
                title: "下一页",
                value: "next",
                children: [
                  {
                    title: "字符箭头",
                    value: "nextarrow",
                  },
                ]
              }
            ],
          },
        ],
      },
    ],
    preset: true
  },

  /**
   * 发布默认porps
   */
  exposeApi: [
    {
      apiId: "init",
      name: "获取初始数据(将在初始化事件前调用)",
    },
  ],
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'onLastOneStart';

export default config;
