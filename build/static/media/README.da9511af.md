# Lottery 
***抽奖是一个比较复杂的业务,请权衡配置的复杂度根据实际情况来开发业务组件,不建议过于灵活***
## 设置游戏类型

|游戏类型|说明|
|----|----|
|boxroulette|九宫格: 方形轮盘抽奖|
|roulette|大转盘: 轮盘抽奖,建议抽奖奖品数不大于8个|
|flipcard|翻牌: 奖品数最大为6个|
|slotmachine|老虎机|
|treasurebox|开宝箱|
|dice|掷骰子: 奖品数最大为6个|

<br />

## 设置奖品数据
  - 请从运行时配置奖品数据
    <br />
  - 奖品数据要求：
    ```typeScript
        Prizes = interface Prize {
            /**奖品id*/ 
            prizeId: number; 
            /**奖品类型 0 未中奖, 1 实物, 2 虚拟*/
            prizeType: number; 
            /** 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡 */ 
            receiveType?: number; 
            /** 奖品别名 */ 
            prizeAlias?: string; 
            /** 奖品名称 */ 
            prizeName: string; 
            /** 中奖提示信息 */ 
            awardMsg?: string;
            /** 游戏图片 */ 
            gameImg?: string; 
            /** 奖品图片 */ 
            prizeImg: string; 
            /** 奖品备注 */ 
            memo?: string; 
        }[]
    ```
    <br />
    
## 设置中奖记录
  - 请从运行时配置中奖记录数据
  - 中奖记录数据要求
    ```typeScript
      Records = interface Record {
        /**中奖id */
        id?: number | string;
        /**奖品id*/ 
        prizeId: number; 
        /** 奖品名称 */ 
        prizeName: string; 
        /** 奖品图片 */ 
        prizeImg: string; 
        /** 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡 */ 
        receiveType?: number; 
        /**收货地址 */
        receiverAddress?: string;
        /**收货姓名 */
        receiverName?: string;
        /**收货电话 */
        receiverPhone?: string;
        /**中奖时间 */
        winTime?: string;
        /** 奖品备注 */ 
        memo?: string; 
        [keys: string]: any;
      }
    ```

## 设置活动规则
  - +增加：增加单条文本，拖动左侧箭头滑块可以自由调整文本排序，右侧减号可以删除单条文本，文本允许输入html标签。<br /> 例如：新增一条带html标签的文本：

    ```html
        <!--在文本输入框输入以下内容-->
        <h2 style="color: orange">这是活动规则文字</h2><h3>这是副活动规则文字</h3>
    ```

## 设置抽奖用户
- **手机** 设置手机号码,通常在运行时会保存抽奖人用户信息,可以从中获取抽奖人手机号码;
- **填写身份证** 这里设置抽奖人是否要填写身份证,1隐藏、2验证、3为空时不验证有填写时验证、4不验证;

## 设置收货人信息
- **电话** 收货人手机号码;
- **省市区名称** 输入省市区名用,隔开: xx省,xx市,xx区/县;
- **省市区id** 输入省市区id用,隔开: 15,1513,151315;<div style="color:red">(省市区名称与省市区id必须成组出现,省市区id设置为15,1513,151315时省市区名称要设为对应的xx省,xx市,xx区/县)</div>
- **详细地址** 详细地址
- **身份证号** 中奖人身份证号码

## 设置中奖弹窗
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

## 抽奖前置检查
    用于禁用抽奖
  - 禁用抽奖: 当条件成立时禁用抽奖
  - 信息: 禁用抽奖的原因

## 抽奖
  - 抽奖: 调用此方法启动抽奖

## 抽奖逻辑流程
<img src="./images/flow/lottery.svg" style="width: 100%" />
<hr />
<br />

## 抽奖核心模块
<img src="./images/flow/game.svg" style="width: 100%" />
<hr />
<br />

## 抽奖流程
<img src="./images/flow/startlottery.svg" style="width: 100%" />
