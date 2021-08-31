import { PrizeType } from '@byhealth/lottery/dist/games/Case';
import { GameMap } from './useGame';

export interface saveAddressParames {
    /**详细地址 */
    address: string;
    /**身份证 */
    idcode: string;
    /**收货电话 */
    phone: string;
    /**收货人 */
    receiver: string;
    /**省市区id */
    regions: string;
    /**省市区名称 */
    regionsName: string;
}

export enum IdcardRequire {
    隐藏身份证 = 1,
    验证身份证 = 2,
    身份证为空时不验证有填写时验证 = 3,
    不验证身份证 = 4,
}

export interface receiverInfoType {
    /**
     * 身份证号
     */
    idCard?: string;
    /**
     * 收货人姓名
     */
    receiverName?: string;
    /**
     * 收货人电话
     */
    receiverPhone?: string;
    /**
     * 收货省市区id['15', '1513', '151315'],
     */
    region?: string[];
    /**
     * 收货省市区 ['广东省','广州市','天河区']
     */
    regionName?: string[];
    /**
     * 详细地址
     */
    address?: string;
}

export interface GameRef {
    game: React.MutableRefObject<GameMap['case'] | undefined>;
    saveAddress: (
        /** 保存地址方法*/
        submit: (address: saveAddressParames) => void,
        /** 成功回调 */
        success?: () => void,
        /** 取消/关闭回调 */
        cancel?: () => void,
    ) => void;
}

export interface GameProps {
    /**Game挂载Id\游戏将要寄生的Node Id */
    parentId?: string;
    /**Game自身Id\默认game-target-时间戳+100以内随机数 */
    targetId?: string;
    /**Game皮肤定义 定义游戏模块的UI展示效果*/
    style?: any;
    /**抽奖奖品 */
    prizes?: PrizeType[];
    /**开始抽奖方法 */
    start?: () => Promise<PrizeType>;
    /**保存地址方法 */
    saveAddress?: (data: saveAddressParames) => Promise<void>;
    /**参与抽奖人的电话号码，有则显示 */
    playerPhone?: string;
    /**获取短信验证码接口,用于短信验证参与人电话号码，有电话号码且有此方法时开启短信验证*/
    checkVerificationCode?: () => Promise<any>;
    /**默认收货人信息 中奖时此信息将自动填写到收货地址表单*/
    receiverInfo?: receiverInfoType;
    /**
     * 是否填写身份证
     * 状态：1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
     */
    cardIdRequest?: IdcardRequire;
    /**游戏类型 */
    type?: keyof GameMap;
    /**取消/关闭中奖弹窗时回调 */
    onCancel?: () => void;
    /**确认中奖弹窗时回调 */
    onEnsure?: (data: PrizeType) => void;
    /**未中奖弹窗标题 */
    failedModalTitle?: string;
    /**未中奖按钮文字 */
    submitFailedText?: string;
    /**中奖弹窗标题 */
    successModalTitle?: string;
    /**中奖按钮文字 */
    submitSuccessText?: string;
    /**中奖去填写地址按钮文字 */
    submitAddressText?: string;
    /**样式名 */
    className?: string;
    /**中奖记录 */
}
