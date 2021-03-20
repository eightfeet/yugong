import { store } from '~/redux/store';

const description = (unit: string = store.getState().controller.unit || 'px') => ({
    "display": {
        "width": [
            "number",
            "宽度",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "height": [
            "number",
            "高度",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "zIndex": [
            "number",
            "层级",
            null,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "position": [
            "select",
            "定位",
            null,
            [
                {
                    "name": "相对",
                    "value": "relative"
                },
                {
                    "name": "浮动",
                    "value": "absolute"
                },
                {
                    "name": "固定",
                    "value": "fixed"
                }
            ]
        ],
        "left": [
            "number",
            "左",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "right": [
            "number",
            "右",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "top": [
            "number",
            "上",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "bottom": [
            "number",
            "下",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "padding": [
            "number",
            "内边距",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "margin": [
            "number",
            "外边距",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ]
    },
    "backgroundCommon": {
        "imageUrl": [
            "upload",
            "背景图片"
        ],
        "backgroundColor": [
            "color",
            "背景色"
        ],
        "position": [
            "select",
            "背景位置",
            "%",
            [
                {
                    "name": "左上",
                    "value": "leftTop"
                },
                {
                    "name": "中上",
                    "value": "centerTop"
                },
                {
                    "name": "右上",
                    "value": "rightTop"
                },
                {
                    "name": "左中",
                    "value": "leftCenter"
                },
                {
                    "name": "中间",
                    "value": "centerCenter"
                },
                {
                    "name": "右中",
                    "value": "rightCenter"
                },
                {
                    "name": "左中",
                    "value": "leftBottom"
                },
                {
                    "name": "中间",
                    "value": "centerBottom"
                },
                {
                    "name": "右中",
                    "value": "rightBottom"
                }
            ]
        ],
        "positionX": [
            "number",
            "横向位置",
            "%",
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "positionY": [
            "number",
            "纵向位置",
            "%",
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "sizeX": [
            "number",
            "X尺寸",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "sizeY": [
            "number",
            "Y尺寸",
            unit,
            {
                "start": 0,
                "end": 1000,
                "default": 0
            }
        ],
        "repeat": [
            "select",
            "背景平铺",
            null,
            [
                {
                    "name": "不平铺",
                    "value": "no-repeat"
                },
                {
                    "name": "平铺",
                    "value": "repeat"
                },
                {
                    "name": "横向平铺",
                    "value": "repeat-x"
                },
                {
                    "name": "纵向平铺",
                    "value": "repeat-y"
                }
            ]
        ]
    },
    "backgroundGradient": {
        "gradient": {
            "list": {
                "limit": 10
            },
            "color": [
                "color",
                "起始颜色"
            ],
            "transition": [
                "number",
                "起始位置",
                "%",
                {
                    "start": 0,
                    "end": 100,
                    "default": 0
                }
            ]
        },
        "gradientDirections": [
            "select",
            "渐变样式",
            null,
            [
                {
                    "name": "左右",
                    "value": "left"
                },
                {
                    "name": "上下",
                    "value": "top"
                },
                {
                    "name": "对角",
                    "value": "-45deg"
                },
                {
                    "name": "反向对角",
                    "value": "45deg"
                },
                {
                    "name": "径向",
                    "value": "center"
                }
            ]
        ]
    },
    
    "border": {
        "radius": [
            "number",
            "圆角",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "radiusTopLeft": [
            "number",
            "左上圆角",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "radiusTopRight": [
            "number",
            "右上圆角",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "radiusBottomLeft": [
            "number",
            "左下圆角",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "radiusBottomRight": [
            "number",
            "右下圆角",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "borderColor": [
            "color",
            "边框色"
        ],
        "borderPosition": [
            "select",
            "边框",
            null,
            [
                {
                    "name": "全部",
                    "value": "all"
                },
                {
                    "name": "上",
                    "value": "Top"
                },
                {
                    "name": "右",
                    "value": "Right"
                },
                {
                    "name": "下",
                    "value": "Bottom"
                },
                {
                    "name": "左",
                    "value": "Left"
                }
            ]
        ],
        "borderStyle": [
            "select",
            "样式",
            null,
            [
                {
                    "name": "solid",
                    "value": "solid"
                },
                {
                    "name": "dotted",
                    "value": "dotted"
                },
                {
                    "name": "dashed",
                    "value": "dashed"
                },
                {
                    "name": "double",
                    "value": "double"
                },
                {
                    "name": "groove",
                    "value": "groove"
                },
                {
                    "name": "ridge",
                    "value": "ridge"
                },
                {
                    "name": "inset",
                    "value": "inset"
                },
                {
                    "name": "outset",
                    "value": "outset"
                },
                {
                    "name": "hidden",
                    "value": "hidden"
                },
                {
                    "name": "none",
                    "value": "none"
                }
            ]
        ],
        "borderWidth": [
            "number",
            "边宽",
            unit,
            {
                "start": 0,
                "end": 30,
                "default": 1
            }
        ]
    },
    "boxShadow": {
        "list": {
            "limit": 10
        },
        "shiftRight": [
            "number",
            "横向偏移",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "shiftDown": [
            "number",
            "纵向偏移",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "spread": [
            "number",
            "散布",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "blur": [
            "number",
            "模糊",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "color": [
            "color",
            "颜色"
        ],
        "inset": [
            "boolean",
            "内阴影",
            null,
            {
                "default": false
            }
        ]
    },
    "textShadow": {
        "list": {
            "limit": 10
        },
        "shiftRight": [
            "number",
            "横向偏移",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "shiftDown": [
            "number",
            "纵向偏移",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "blur": [
            "number",
            "模糊",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "color": [
            "color",
            "颜色"
        ]
    },
    "font": {
        "fontSize": [
            "number",
            "字体大小",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "lineHeight": [
            "number",
            "行间距",
            unit,
            {
                "start": 0,
                "end": 10,
                "default": 0
            }
        ],
        "color": [
            "color",
            "文字颜色"
        ],
        "letterSP": [
            "number",
            "字母间距",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "wordSp": [
            "number",
            "字间距",
            unit,
            {
                "start": 0,
                "end": 100,
                "default": 0
            }
        ],
        "fontWeight": [
            "select",
            "粗体",
            null,
            [
                {
                    "name": "正常",
                    "value": "normal"
                },
                {
                    "name": "加粗",
                    "value": "bold"
                }
            ]
        ],
        "decoration": [
            "select",
            "样式",
            null,
            [
                {
                    "name": "无",
                    "value": "none"
                },
                {
                    "name": "下划线",
                    "value": "underline"
                },
                {
                    "name": "上划线",
                    "value": "overline"
                },
                {
                    "name": "删除线",
                    "value": "line-through"
                }
            ]
        ],
        "fontStyle": [
            "select",
            "斜体",
            null,
            [
                {
                    "name": "正常",
                    "value": "normal"
                },
                {
                    "name": "斜体",
                    "value": "italic"
                }
            ]
        ],
        "align": [
            "select",
            "对齐方式",
            null,
            [
                {
                    "name": "左对齐",
                    "value": "left"
                },
                {
                    "name": "居中",
                    "value": "right"
                },
                {
                    "name": "右对齐",
                    "value": "right"
                }
            ]
        ]
    },
    "transform": {
        "scale": [
            "number",
            "缩放",
            null,
            {
                "start": 0,
                "end": 10,
                "default": 0
            }
        ],
        "rotate": [
            "number",
            "旋转",
            "deg",
            {
                "start": -360,
                "end": 360,
                "default": 0
            }
        ],
        "translateX": [
            "number",
            "横向偏移",
            unit,
            {
                "start": -100,
                "end": 100,
                "default": 0
            }
        ],
        "translateY": [
            "number",
            "纵向偏移",
            unit,
            {
                "start": -100,
                "end": 100,
                "default": 0
            }
        ],
        "skewX": [
            "number",
            "横向倾斜",
            "deg",
            {
                "start": -360,
                "end": 360,
                "default": 0
            }
        ],
        "skewY": [
            "number",
            "纵向倾斜",
            "deg",
            {
                "start": -360,
                "end": 360,
                "default": 0
            }
        ]
    }
})

export default description;