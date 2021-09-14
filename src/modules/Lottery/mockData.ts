import { RecordsType } from "./Lottery";

export const prizes = [
    {
        prizeId: 1,
        prizeType: 1,
        receiveType: 2,
        prizeAlias: '一等奖',
        prizeName: '奖品',
        status: 1,
        awardMsg: '亲！恭喜您获得一等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
    {
        prizeId: 2,
        prizeType: 0,
        receiveType: 1,
        prizeAlias: '谢谢参与',
        prizeName: '很遗憾',
        status: 1,
        awardMsg: '对不起您没有中奖。',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0602093131783.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163509653.png',
        memo: '下次继续努力吧！',
    },
    {
        prizeId: 3,
        prizeType: 1,
        receiveType: 2,
        prizeAlias: '三等奖',
        prizeName: '三等奖',
        status: 1,
        awardMsg: '亲！恭喜您获得三等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
    {
        prizeId: 4,
        prizeType: 2,
        receiveType: 2,
        prizeAlias: '四等奖',
        prizeName: '四等奖',
        status: 1,
        awardMsg: '亲！恭喜您获得四等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
    {
        prizeId: 5,
        prizeType: 1,
        receiveType: 2,
        prizeAlias: '五等奖',
        prizeName: '五等奖',
        status: 1,
        awardMsg: '亲！恭喜您获得五等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
    {
        prizeId: 6,
        prizeType: 1,
        receiveType: 2,
        prizeAlias: '六等奖',
        prizeName: '六等奖',
        status: 1,
        awardMsg: '亲！恭喜您获得六等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
    {
        prizeId: 1,
        prizeType: 1,
        receiveType: 2,
        prizeAlias: '七等奖',
        prizeName: '七等奖',
        status: 1,
        awardMsg: '亲！恭喜您获得七等奖！',
        prizeImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        gameImg:
            'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0601163031117.png',
        memo: '该奖品由xxxx公司统一提供！',
    },
];

export const records = prizes.map((item: RecordsType, index: number) => {
    item.id = 2578100 + index;
    item.winTime = `2021-10-${index+1}`
    if (index === 2) {
        item.receiverAddress = '广东省 广州市 天河区 体育西路352号';
        item.receiverPhone = '13622809422';
        item.receiverName = '王蒙';
    }
    if (index === 3) {
        item.extra = '领取方式'
    }
    return item;
})

/**收货人信息 */
export const receiverInfo = {
    idCard: "430522198306154611",
    receiverName: "王蒙",
    regionName: ["广东省", "广州市", "天河区"],
    region: ["15", "1513", "151315"],
    receiverPhone: "13622804521",
    address: "体育西路352号",
  };
