import { ComExposeEvents, ExposeApi, ExposeDefaultProps, ExposeFunctions } from "~/types/modules";

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
            name: 'setData',
            description: '设置数据源',
            arguments: [
                {
                    type: 'array',
                    name: 'imageUrls',
                    describe: '图片地址',
                    data: [],
                    fieldName: 'imageUrls',
                },
                {
                    type: 'array',
                    name: 'imageLinks',
                    describe: '与图片地址保持索引一致空值图片不可点击',
                    data: [],
                    fieldName: 'imageLinks',
                },
            ],
        },

        {
            name: 'setSlider',
            description: 'Slider 设置',
            arguments: [
                {
                    type: 'object',
                    name: 'configs',
                    describe: ` (autoPlay: 自动播放-0开启1关闭)`,
                    data: {
                        autoPlay: '0',
                    },
                    fieldName: 'configs',
                },
            ],
        },
    ],

    /**
     * 发布事件的静态描述
     */
    exposeEvents: [
        {
            name: 'mount',
            description: '挂载',
        },
        {
            name: 'unmount',
            description: '卸载',
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
            basic: {},
            slider: {},
        },
    },
};

export default staticConstants;
