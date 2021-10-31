## 抽奖-转盘
### 设置奖品数据
- **奖品数据**: 请从运行时配置奖品数据<br />
  - 奖品数据类型：
    ```typeScript
        interface PrizeTypes {
            prizeId: number; // 奖品id
            prizeType: number; // 奖品类型 0 未中奖, 1 实物, 2 虚拟
            receiveType?: number; // 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
            prizeAlias?: string; // 奖品别名
            prizeName: string; // 奖品名称
            awardMsg?: string; // 中奖提示信息
            gameImg?: string; // 游戏图片
            prizeImg: string; // 奖品图片
            memo?: string; // 奖品备注
        }
    ```
  - 奖品数据结构：
    ```json
        [
            {
                "prizeId": 1127,
                "prizeType": 1,
                "receiveType": 3,
                "prizeAlias": "一等奖",
                "prizeName": "iPhone",
                "awardMsg": "获得本场特等奖",
                "gameImg": "http://www.xxxx.com/xxx.jpg",
                "prizeImg": "http://www.xxxx.com/xxx.jpg",
                "memo": "奖品备注"
            },
            {
                ...
            }
        ]
    ```
### 设置抽奖用户
- **手机** 设置手机号码,通常在运行时会保存抽奖人用户信息,可以从中获取抽奖人手机号码;
- **填写身份证** 这里设置抽奖人是否要填写身份证,1隐藏、2验证、3为空时不验证有填写时验证、4不验证;
### 设置收货人信息
- **电话** 收货人手机号码;
- **省市区名称** 输入省市区名用,隔开: xx省,xx市,xx区/县;
- **省市区id** 输入省市区id用,隔开: 15,1513,151315;<div style="color:red">(省市区名称与省市区id必须成组出现,省市区id设置为15,1513,151315时省市区名称要设为对应的xx省,xx市,xx区/县)</div>
- **详细地址** 详细地址
- **身份证号** 中奖人身份证号码
### 设置中奖弹窗
- **标题** 中奖时设置中奖弹窗标题
- **动画** 设置中奖弹窗动画,动画包含
  ```
    flipInY: y轴反转
    flipInX: x轴反转
    fadeInUp: 从底部淡入
    fadeInDown: 从上淡入
    fadeInLeft: 从左淡入
    fadeInRight: 从右淡入
    zoomIn: 中心放大进入
    zoomInUp: 顶部放大进入
    zoomInDown: 底部放大进入
    zoomInLeft: 左边放大进入
    zoomInRight: 右边放大进入
  ```
<img src="/images/flow/lottery.svg" style="width: 100%" />