import { useEffect } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import useGame from '~/hooks/useGame';

export interface RouletteProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Roulette:Modules<RouletteProps> = (props) => {
    const [game, nodes] = useGame({
        targetId: `game${props.id}`,
        parentId: "parentId",
        playerPhone: "13635219421",
        cardIdRequest: 3, 
        style: {
            "GameTheme": {
                "wrap": {
                    "top": "-1.76em",
                    "left": "-1em",
                    "width": "19.6em",
                    "height": "19.6em",
                    "zIndex": 10,
                    "position": "absolute"
                },
                "wheel": {
                    "backgroundSize": "100% 100%",
                    "backgroundColor": "rgba(255,14,14,0)",
                    "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927125229016.png)",
                    "backgroundRepeat": "no-repeat"
                },
                "divide": {
                    "display": "none",
                    "fontSize": "normal",
                    "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927122302470.png)"
                },
                "modify": [
                    {
                        "top": "-7em",
                        "left": "-3.2em",
                        "width": "24em",
                        "height": "47.904em",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0928162954328.png)",
                        "backgroundRepeat": "no-repeat",
                        "backgroundPosition": "center center"
                    },
                    {
                        "top": "-3.9em",
                        "left": "-3.2em",
                        "width": "24em",
                        "height": "24em",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927163439807.gif)",
                        "backgroundRepeat": "no-repeat",
                        "backgroundPosition": "center center"
                    }
                ],
                "needle": {
                    "left": "10.2em",
                    "width": "8em",
                    "height": "8em",
                    "position": "absolute",
                    "marginTop": "-4.352em",
                    "marginLeft": "-4.352em",
                    "backgroundSize": "100% 100%",
                    "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927121738971.png)",
                    "backgroundRepeat": "no-repeat"
                },
                "gameImg": {
                    "height": "40%",
                    "fontSize": "normal",
                    "marginTop": "0.3em"
                },
                "prizeAlias": {
                    "fontSize": "0.704em"
                },
                "lotteryButton": {
                    "backgroundSize": "80% 80%",
                    "backgroundRepeat": "no-repeat"
                }
            },
            "LoadingTheme": {
                "content": {
                    "backgroundColor": "transparent"
                },
                "overlay": {
                    "backgroundColor": "transparent"
                },
                "vertices": {
                    "width": ".4em",
                    "height": ".4em",
                    "elements": [
                        "red",
                        "green",
                        "blue",
                        "yellow",
                        "orange"
                    ],
                    "backgroundColor": "#8bc34a"
                }
            },
            "MessageTheme": {
                "main": {
                    "color": "#fff",
                    "backgroundColor": "rgba(0, 0, 0, 0.8)"
                },
                "wrap": {
                    "top": "3em"
                }
            },
            "FailedModalTheme": {
                "memo": {
                    "display": "none"
                },
                "close": {
                    "top": "auto",
                    "left": "50%",
                    "width": "2.08em",
                    "bottom": "-4.256em",
                    "height": "2.08em",
                    "zIndex": 110,
                    "marginLeft": "-1.04em",
                    "backgroundSize": "contain",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418163518166.png')",
                    "backgroundRepeat": "no-repeat"
                },
                "modify": [],
                "submit": {
                    "color": "#fff",
                    "width": "12em",
                    "border": "none",
                    "height": "1.92em",
                    "fontSize": "1em",
                    "borderRadius": "0.96em",
                    "backgroundColor": "#ff3a55"
                },
                "article": {
                    "position": "relative",
                    "paddingTop": "5em",
                    "paddingBottom": "1em"
                },
                "content": {
                    "color": "#666",
                    "width": "18.88em",
                    "boxShadow": "0 0 1.632em 0.256em rgba(181,74,239,.6)",
                    "borderRadius": "0.7em",
                    "paddingBottom": "1.312em",
                    "background-size": "50%",
                    "background-color": "#fff"
                },
                "overlay": {
                    "backgroundColor": "rgba(0,0,0,0.8)"
                },
                "awardMsg": {},
                "prizeImg": {
                    "top": 0,
                    "left": "50%",
                    "width": "4.8em",
                    "zIndex": "102",
                    "position": "absolute",
                    "marginLeft": "-2.4em"
                },
                "prizeName": {
                    "padding": "0 1em",
                    "fontSize": "1.2em",
                    "textAlign": "center",
                    "marginBottom": "0.3em"
                },
                "contentTop": {
                    "top": 0,
                    "width": "100%",
                    "height": "6.112em",
                    "zIndex": 100,
                    "background-size": "100% 100%",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418153526109.png')",
                    "background-repeat": "no-repeat"
                },
                "modalTitle": {
                    "color": "#fff",
                    "zIndex": 101,
                    "fontSize": "1.408em",
                    "position": "relative",
                    "fontWeight": "bolder",
                    "paddingTop": "0.5em",
                    "background-size": "17.457% auto",
                    "background-repeat": "no-repeat",
                    "backgroundPosition": "center bottom"
                },
                "prizeAlias": {},
                "contentBottom": {
                    "display": "none"
                }
            },
            "NoticeModalTheme": {
                "close": {
                    "top": "auto",
                    "left": "50%",
                    "width": "2.08em",
                    "bottom": "-4.256em",
                    "height": "2.08em",
                    "zIndex": 110,
                    "marginLeft": "-1.04em",
                    "backgroundSize": "contain",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418163518166.png')",
                    "backgroundRepeat": "no-repeat"
                },
                "modify": [],
                "submit": {
                    "display": "none"
                },
                "article": {
                    "zIndex": 101,
                    "fontSize": "1.2em",
                    "position": "relative",
                    "paddingTop": "2.3em",
                    "paddingBottom": "1em"
                },
                "content": {
                    "color": "#666",
                    "width": "18.88em",
                    "boxShadow": "0 0 1.632em 0.256em rgba(180,165,191,.6)",
                    "borderRadius": "0.64516rem",
                    "paddingBottom": "1.312em",
                    "background-size": "50%",
                    "background-color": "#fff"
                },
                "overlay": {
                    "backgroundColor": "rgba(0,0,0,0.8)"
                },
                "contentTop": {
                    "top": 0,
                    "width": "100.1%",
                    "height": "6.112em",
                    "zIndex": 100,
                    "background-size": "100% 100%",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418153526109.png')",
                    "background-repeat": "no-repeat"
                },
                "modalTitle": {
                    "color": "#fff",
                    "height": "3.8em",
                    "zIndex": 101,
                    "fontSize": "1.408em",
                    "position": "relative",
                    "fontWeight": "bolder",
                    "paddingTop": "0.5em",
                    "background-size": "17.457% auto",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418162618601.png')",
                    "background-repeat": "no-repeat",
                    "backgroundPosition": "center bottom"
                },
                "contentBottom": {
                    "display": "none"
                }
            },
            "environmentTheme": {
                "home": {
                    "logo": {
                        "display": "none"
                    },
                    "menu": {
                        "width": "11.05em",
                        "height": "4.83em",
                        "margin": "0 0.5em",
                        "fontSize": "0.75em",
                        "textAlign": "center",
                        "padding-top": "0.7em",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927115828639.png)"
                    },
                    "wrap": {
                        "overflow": "hidden",
                        "backgroundSize": "100% auto",
                        "backgroundColor": "rgba(233,157,203,1)",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927164139766.jpg)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "title": {
                        "width": "23.8em",
                        "height": "4.8em",
                        "marginTop": "-1em",
                        "marginLeft": "-11.9em",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0929115316035.png)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "chance": {
                        "color": "#fff",
                        "width": "18.5em",
                        "height": "2em",
                        "margin": "0.8em auto 0 auto",
                        "zIndex": "100",
                        "fontSize": "0.8em",
                        "textAlign": "center",
                        "line-height": "1em",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927113540814.png)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "footer": {},
                    "header": {},
                    "member": {
                        "display": "none"
                    },
                    "report": {
                        "top": "3.6em",
                        "color": "#fff",
                        "width": "16em",
                        "fontSize": "0.75em",
                        "overflow": "hidden",
                        "position": "absolute",
                        "min-width": "17em",
                        "textAlign": "left",
                        "margin-left": "-8em",
                        "text-indent": "-4.5em",
                        "padding-left": "2em",
                        "text-overflow": "ellipsis",
                        "backgroundSize": "100% 100%",
                        "backgroundColor": "rgba(255,58,58,0)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "article": {},
                    "gameWrap": {},
                    "menuwrap": {
                        "width": "20em",
                        "margin": "-1em auto 0 auto",
                        "position": "relative",
                        "paddingTop": "4em"
                    },
                    "chanceIcon": {
                        "backgroundSize": "40% 40%",
                        "backgroundImage": "url( https://upload-yyj.by-health.com/upload/images/20190420091138316.png)",
                        "backgroundRepeat": "no-repeat",
                        "backgroundPosition": "center center"
                    },
                    "reportIcon": {
                        "top": "0.7em",
                        "left": "0.5em",
                        "width": "1.056em",
                        "height": "0.832em",
                        "position": "absolute",
                        "backgroundSize": "100% 100%",
                        "backgroundImage": "url(https://upload-yyj.by-health.com/upload/images/0927135236459.png)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "chanceNumber": {
                        "color": "#fee94e",
                        "fontSize": "1.4em"
                    },
                    "reportOutstanding": {
                        "color": "#fee94e"
                    },
                    "participationStatus": {}
                },
                "rules": {
                    "wrap": {
                        "backgroundSize": "100% auto",
                        "backgroundColor": "#eee",
                        "backgroundImage": "url( https://upload-yyj.by-health.com/upload/images/20190420075546839.jpg)",
                        "backgroundRepeat": "no-repeat"
                    },
                    "rules": {
                        "color": "#fff"
                    },
                    "title": {
                        "display": "none"
                    },
                    "header": {},
                    "article": {},
                    "content": {
                        "backgroundColor": "rgba(0,0,0,.4)"
                    },
                    "rulesItem": {
                        "color": "#fff"
                    },
                    "rulesItemIndex": {
                        "color": "#a83667",
                        "backgroundColor": "#fff"
                    }
                },
                "global": {
                    "notice": {
                        "display": "none"
                    },
                    "iosNotice": {
                        "display": "block"
                    }
                },
                "records": {
                    "item": {},
                    "list": {},
                    "wrap": {},
                    "stamp": {},
                    "title": {
                        "display": "none"
                    },
                    "header": {
                        "display": "none"
                    },
                    "article": {},
                    "content": {},
                    "itemPrize": {},
                    "itemtitle": {},
                    "itemStatus": {},
                    "saveAddress": {
                        "backgroundColor": "#f00"
                    },
                    "activityName": {}
                },
                "recorddetail": {
                    "icon": {},
                    "wrap": {},
                    "block": {},
                    "title": {},
                    "header": {},
                    "article": {},
                    "content": {},
                    "blockrow": {},
                    "blocktitle": {},
                    "saveaddress": {}
                }
            },
            "AddressModalTheme": {
                "row": {
                    "marginBottom": ".5em"
                },
                "close": {
                    "top": "auto",
                    "left": "50%",
                    "width": "2.08em",
                    "bottom": "-4.256em",
                    "height": "2.08em",
                    "zIndex": 110,
                    "marginLeft": "-1.04em",
                    "backgroundSize": "contain",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418163518166.png')",
                    "backgroundRepeat": "no-repeat"
                },
                "input": {
                    "color": "#666666",
                    "fontSize": "0.8em",
                    "boxShadow": "0 0.1em rgba(255,255,255,.97), inset 0 0.1em 0.2em rgba(129,129,129,.36)",
                    "borderColor": "#b5b5b5",
                    "borderRadius": "0.2em",
                    "backgroundColor": "#f6f6f6"
                },
                "label": {
                    "color": "#666666"
                },
                "footer": {
                    "zIndex": 120,
                    "position": "relative",
                    "paddingBottom": "1em"
                },
                "header": {
                    "color": "#fbe945",
                    "border": "none",
                    "zIndex": 121,
                    "fontSize": "1.2em",
                    "position": "relative",
                    "paddingTop": "0.5em"
                },
                "submit": {
                    "color": "#fff",
                    "width": "12em",
                    "border": "none",
                    "height": "1.92em",
                    "fontSize": "1em",
                    "borderRadius": "0.96em",
                    "backgroundColor": "#ff3a55"
                },
                "article": {
                    "zIndex": 120,
                    "position": "relative",
                    "paddingTop": "1em"
                },
                "content": {
                    "color": "#666",
                    "width": "18.88em",
                    "boxShadow": "0 0 1.632em 0.256em rgba(181,74,239,.6)",
                    "borderRadius": "0.7em",
                    "background-size": "50%",
                    "background-color": "#fff"
                },
                "overlay": {
                    "backgroundColor": "rgba(0,0,0,0.8)"
                },
                "regions": {
                    "overlay": {},
                    "cancelBtn": {},
                    "ensureBtn": {}
                },
                "textarea": {
                    "color": "#666666",
                    "fontSize": "0.8em",
                    "boxShadow": "0 0.1em rgba(255,255,255,.97), inset 0 0.1em 0.2em rgba(129,129,129,.36)",
                    "borderColor": "#b5b5b5",
                    "borderRadius": "0.2em",
                    "backgroundColor": "#f6f6f6"
                },
                "codeButton": {
                    "color": "#8a3333",
                    "border": "none",
                    "height": "2.4em",
                    "fontSize": "0.9em",
                    "borderRadius": "0.2em",
                    "backgroundColor": "#fbe945"
                },
                "contentTop": {
                    "top": 0,
                    "width": "100%",
                    "height": "3em",
                    "zIndex": 100,
                    "background-size": "100% auto",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418165200596.png')",
                    "background-repeat": "no-repeat"
                },
                "contentBottom": {
                    "width": "100%",
                    "bottom": 0,
                    "height": "5em",
                    "backgroundSize": "100%",
                    "backgroundRepeat": "no-repeat",
                    "backgroundPosition": "left bottom"
                },
                "codeButtonDisable": {
                    "color": "#666",
                    "border": "none",
                    "height": "2.4em",
                    "fontSize": "0.9em",
                    "borderRadius": "0.2em",
                    "backgroundColor": "#aaa"
                }
            },
            "SuccessModalTheme": {
                "memo": {
                    "display": "none"
                },
                "close": {
                    "top": "auto",
                    "left": "50%",
                    "width": "2.08em",
                    "bottom": "-4.256em",
                    "height": "2.08em",
                    "zIndex": 110,
                    "marginLeft": "-1.04em",
                    "backgroundSize": "contain",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418163518166.png')",
                    "backgroundRepeat": "no-repeat"
                },
                "modify": [],
                "submit": {
                    "color": "#fff",
                    "width": "12em",
                    "border": "none",
                    "height": "1.92em",
                    "fontSize": "1em",
                    "borderRadius": "0.96em",
                    "backgroundColor": "#ff3a55"
                },
                "article": {
                    "color": "red",
                    "position": "relative",
                    "paddingTop": "5em",
                    "paddingBottom": "1em"
                },
                "content": {
                    "color": "#666",
                    "width": "18.88em",
                    "boxShadow": "0 0 1.632em 0.256em rgba(181,74,239,.6)",
                    "borderRadius": "0.7em",
                    "paddingBottom": "1.312em",
                    "background-size": "50%",
                    "background-color": "#fff"
                },
                "overlay": {
                    "backgroundColor": "rgba(0,0,0,0.8)"
                },
                "awardMsg": {},
                "prizeImg": {
                    "top": 0,
                    "left": "50%",
                    "width": "4.8em",
                    "zIndex": "102",
                    "position": "absolute",
                    "marginLeft": "-2.4em"
                },
                "prizeName": {
                    "padding": "0 1em",
                    "fontSize": "1.2em",
                    "textAlign": "center",
                    "marginBottom": "0.3em"
                },
                "contentTop": {
                    "top": 0,
                    "width": "100%",
                    "height": "6.112em",
                    "zIndex": 100,
                    "background-size": "100% 100%",
                    "backgroundImage": "url(' https://upload-yyj.by-health.com/upload/images/20190418165200596.png')",
                    "background-repeat": "no-repeat"
                },
                "modalTitle": {
                    "color": "#fbe945",
                    "zIndex": 101,
                    "fontSize": "1.408em",
                    "position": "relative",
                    "fontWeight": "bolder",
                    "paddingTop": "0.5em",
                    "background-size": "17.457% auto",
                    "background-repeat": "no-repeat",
                    "backgroundPosition": "center bottom"
                },
                "prizeAlias": {},
                "contentBottom": {
                    "display": "none"
                }
            }
          },
        prizes: [{
            "prizeId": 1, // 奖品id
            "prizeType": 1, // 奖品类型 0 未中奖, 1 实物, 2 虚拟
            "receiveType": 1, // 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
            "prizeAlias": "巴西绿蜂胶", // 奖品别名
            "prizeName": "蜂胶软胶囊彩盒装（60粒，巴西绿蜂胶）", // 奖品名称
            "awardMsg": null, // 中奖提示信息
            "gameImg": "./assets/images/card1.png", // 游戏图片
            "prizeImg": "./assets/images/prize1.jpg", // 奖品图片
            "memo": "奖品的备注说明！" // 奖品备注
         },{
            "prizeId": 1, // 奖品id
            "prizeType": 1, // 奖品类型 0 未中奖, 1 实物, 2 虚拟
            "receiveType": 1, // 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
            "prizeAlias": "巴西绿蜂胶", // 奖品别名
            "prizeName": "蜂胶软胶囊彩盒装（60粒，巴西绿蜂胶）", // 奖品名称
            "awardMsg": null, // 中奖提示信息
            "gameImg": "./assets/images/card1.png", // 游戏图片
            "prizeImg": "./assets/images/prize1.jpg", // 奖品图片
            "memo": "奖品的备注说明！" // 奖品备注
         }],
        start: () => new Promise<void>((resolve) => {
              window.setTimeout(() => {
                  resolve();
              }, 1000);
          }),
        saveAddress: (data: any) => new Promise<void>((resolve) => {
              window.setTimeout(() => {
                  console.log('地址信息', data);
                  resolve();
              }, 3000);
          }),
        receiverInfo: {
            idCard: "430522201008124611",
            receiverPhone: "13622841234",
            address: "address"
        },
        checkVerificationCode: (data: any) => new Promise<void>((resolve) => {
              window.setTimeout(() => {
                  resolve();
              }, 3000);
          }), // 检查手机验证码
        emBase: 10,
        onCancel: () => console.log('关闭中奖结果'),
        onEnsure: function(prize: any){ console.log('确定中奖结果1！', prize); },
        loading: {
          size: 20,
          length: 5,
          cycleTime: 1
        }
  })
    const { eventEmitter, events = {}, api} = props;
    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find(item => item.apiId === '');
        requester(apiArguments || {});
    }, [api])
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events.unmount);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Wrapper {...props} >
            <div id={`game${props.id}`} ref={nodes}>
            </div>
        </Wrapper>
    )
}

/**
* 注册方法的静态描述与默认参数定义
*/
Roulette.exposeFunctions = [];

/**
* 发布事件的静态描述
*/
Roulette.exposeEvents = [
    {
        name: 'mount',
        description: '初始化',
    },
    {
        name: 'unmount',
        description: '卸载',
    }
];

/**
* 发布默认porps
*/
Roulette.exposeDefaultProps = {};

/**
* 发布默认Api
*/
Roulette.exposeApi = [];

export default Roulette;