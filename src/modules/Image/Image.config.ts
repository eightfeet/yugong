import { ComExposeEvents, ExposeApi, ExposeDefaultProps, ExposeFunctions } from "~/types/modules";

const config: {
   exposeFunctions: ExposeFunctions[];
   exposeEvents: ComExposeEvents;
   exposeDefaultProps: ExposeDefaultProps;
   exposeApi: ExposeApi[]
 } = {
    exposeFunctions: [
        {
            name: 'setImg',
            description: '设置图片Url',
            arguments: [
                {
                    type: 'object',
                    name: '图片路径与属性',
                    describe: '图片路径/属性/跳转url',
                    data: {
                        url: '',
                        alt: '',
                        linkUrl: ''
                    },
                    fieldName: 'img',
                },
            ],
        },
    ],
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
    exposeDefaultProps: {
        style: {
            basic: {},
            image: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '图片',
                        value: 'image',
                    },
                ],
            },
        ],
    },
    exposeApi: [],
};

export default config;
