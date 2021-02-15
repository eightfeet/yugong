import { AppDataListTypes } from '~/types/appData';

const appData: AppDataListTypes = [
    {
        moduleId: 'a',
        layout: {
            w: 10,
            h: 2,
            x: 1,
            y: 19,
            i: 'a',
            moved: false,
            static: false,
        },
        style: {
            basic: {
                display: {
                    width: 100,
                    height: 100,
                    zIndex: 20,
                    position: 'relative',
                },
                border: {
                    radiusTopLeft: 20,
                    radiusTopRight: 20,
                },
                backgroundGradient: {
                    gradient: [
                        {
                            color: 'red',
                            transition: 0,
                        },
                        {
                            color: 'orange',
                            transition: 100,
                        },
                    ],
                    gradientDirections: '-45deg',
                },
                textShadow: [
                    {
                        shiftRight: 12,
                        shiftDown: 12,
                        blur: 21,
                        color: '#444',
                    },
                    {
                        shiftRight: 12,
                        shiftDown: 12,
                        blur: 21,
                        color: '#444',
                    },
                ],
            },
            content: {},
        },
        content: { text: '定制文本内容' },
        event: {},
        type: 'Conterner',
    },
    {
        moduleId: 'b',
        layout: {
            w: 10,
            h: 8,
            x: 1,
            y: 11,
            i: 'b',
            moved: false,
            static: false,
        },
        style: {
            basic: {
            },
            trigger: {
                backgroundCommon: {
                    backgroundColor: 'yellow',
                },
                display: {
                    width: 100,
                    height: 100,
                },
            },
            overlay: {
                backgroundCommon: {
                    backgroundColor: 'red',
                },
            },
            button: {
                display: {
                    width: 100,
                    height: 100,
                },
                backgroundCommon: {
                    backgroundColor: 'yellow',
                },
            }
        },
        content: { text: 'b' },
        event: {},
        type: 'Modal',
    },
    {
        moduleId: 'c',
        layout: {
            w: 10,
            h: 11,
            x: 1,
            y: 0,
            i: 'c',
            moved: false,
            static: false,
        },
        style: {
            basic: {
                display: {
                    width: 100,
                    height: 100,
                },
                backgroundCommon: {
                    backgroundColor: 'yellow',
                    imageUrl: 'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0122230027581.png'
                }
            },
        },
        content: { text: 'c' },
        event: {},
        type: 'Conterner',
    },
];

export default appData;
