import { Component } from 'react';
import { connect } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { AnyObjectType, ArgumentsItem, ArgumentsString } from '~/types/appData';
import {
  getArguments,
  getArgumentsItem,
} from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Lottery.config';
import createStyles, { ClassesKey } from './Lottery.createStyles';
import { Prize } from '@byhealth/lottery/dist/types/core';
import * as mock from './mockData';
import { GameHandle, GameMap } from '~/components/Game/useGame';
import Game, { GameModal, GameRecords } from '~/components/Game';
import requester from '~/core/fetch';
import { saveAddressParames } from '~/components/Game/GameType';
import message from '~/components/Message';
import { gametypes } from '~/components/Game/Game';
import s from './Lottery.module.less';
import classNames from 'classnames';
import { getPrizeById } from './helper';

export interface RecordsType extends Prize {
  /**中奖id */
  id?: number | string;
  /**收货地址 */
  receiverAddress?: string;
  /**收货姓名 */
  receiverName?: string;
  /**收货电话 */
  receiverPhone?: string;
  /**中奖时间 */
  winTime?: string;
  [keys: string]: any;
}

class Lottery extends Component<LotteryProps, State> {
  winInfo: Prize | undefined;
  // 检查禁用抽奖
  checked: {
    /**禁用信息 */
    message?: string;
    /**是否禁用 */
    enabled: boolean;
  };
  gameHandle: GameHandle<typeof Game> | null;
  prizesIsReadyRef: boolean;
  MId: string;
  constructor(props: LotteryProps) {
    super(props);
    this.state = {
      text: '',
      prizes: [],
      phoneAndRCardId: {},
      receiverInfo: mock.receiverInfo,
      successmodalParams: {},
      type: 'redenvelope',
      displayRecord: false,
      displayRule: false,
      ruleText: [],
      records: mock.records,
      disablePullDown: false,
      disablePullUp: false,
    };
    this.checked = { enabled: true };
    this.prizesIsReadyRef = false;
    this.MId = `gametarget${this.props.moduleId}_${this.state.type}`;
    this.gameHandle = null;
  }

  componentDidMount() {
    const {
      setGameType,
      setRunningPrizes,
      setRules,
      setRunningRecords,
      lottery,
      checkedLottery,
      useConfig,
      setDefaultReceiveInfo,
      setSuccessModal,
      showRecord,
      showRules,
    } = this;
    this.props.registersFunction({
      setGameType,
      setRunningPrizes,
      setRules,
      setRunningRecords,
      lottery,
      checkedLottery,
      useConfig,
      setDefaultReceiveInfo,
      setSuccessModal,
      showRecord,
      showRules,
    });
    this.props.eventDispatch().mount();
    this.props.setRunningTimes({ text: 'runningTimeData' });
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  /**保存地址 */
  handleSaveAddress = () => {
    this.gameHandle?.game.current?.core.AddressModal.showModal((address) => {
      console.log(address);
    });
  };

  /**
   * 抽奖前置Api, 用于检查是否满足抽奖条件
   * */
  apiBeforeStart = async () => {
    const apiArguments = this.props.api?.find(
      (item) => item.apiId === 'beforeStart',
    );
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      try {
        return requester(apiArguments || {});
      } catch (error) {
        throw error;
      }
    }
  };

  /**
   * 抽奖Api, 用于抽奖
   */
  apiStart = async () => {
    const apiArguments = this.props.api?.find(
      (item) => item.apiId === 'lottery',
    );
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      return requester(apiArguments || {});
    }
  };

  apiSaveAddress = async (data: saveAddressParames) => {
    const oprationData = {
      winId: 'winInfo.current.id',
      ...data,
    };
    // 这里不需要api设置参数
    const apiArguments = this.props.api?.find(
      (item) => item.apiId === 'saveAddress',
    );
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments) {
      apiArguments.body = [
        {
          type: 'object',
          fieldName: 'addressData',
          data: oprationData,
        },
      ];
      return requester(apiArguments || {});
    }
    // 处理收货地址
    message.warning('没有设置保存地址Api, 当前不可保存！');
  };

  /**
   * 检查手机验证码
   * */
  checkVerificationCode = async (data: { [keys: string]: any }) => {
    // 这里不需要api设置参数
    const apiArguments = this.props.api?.find(
      (item) => item.apiId === 'getVerificationCode',
    );
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments) {
      apiArguments.body = [{ type: 'object', fieldName: 'addressData', data }];
      return requester(apiArguments || {});
    }
    // 处理收货地址
    message.warning('没有设置获取验证码Api！');
  };

  apiGetRecord = async () => {
    const apiArguments = this.props.api?.find(
      (item) => item.apiId === 'getRecord',
    );
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      return requester(apiArguments || {});
    }
  };

  /**
   * 修改抽奖类型
   */
  setGameType = (type: ArgumentsString) => {
    const argOptType = getArgumentsItem(type) as keyof GameMap;
    if (gametypes.includes(argOptType)) {
      this.setState({
        type: argOptType,
      });
    }
  };

  /**
   * 设置规则文本
   */
  setRules = (rules: ArgumentsItem) => {
    const rulesTexts = getArgumentsItem(rules) as any[];
    this.setState({
      ruleText: rulesTexts,
    });
  };

  /**
   * 设置奖品数据, 无数据时使用mock
   */
  setRunningPrizes = (prizes: ArgumentsItem) => {
    let prizesArg = getArgumentsItem(prizes) as any[];
    if (Array.isArray(prizesArg) && prizesArg.length) {
      this.prizesIsReadyRef = true;
    }
    // 没有准备过数据会使用mock数据
    if (!this.prizesIsReadyRef) {
      prizesArg = mock.prizes;
    }
    this.setState({
      prizes: prizesArg,
    });
  };

  onSaveAddress = (item: any) => () => {
    console.log(item);
    return this.handleSaveAddress();
  };

  /**
   * 设置运行时中奖记录
   */
  setRunningRecords = (...args: ArgumentsItem[]) => {
    // 中奖记录
    const { records, disablePullDown, disablePullUp } = getArguments(args) as {
      records: RecordsType[];
      disablePullDown: string;
      disablePullUp: string;
    };

    const data: any = {
      disablePullDown: disablePullDown === '0',
      disablePullUp: disablePullUp === '0',
    };

    if (Array.isArray(records) && records.length) {
      data.records = records;
    }

    this.setState(data);
  };

  /**
   * 渲染中奖记录
   */
  renderRecords = () =>
    this.state.records?.length ? (
      <ul className={classNames(s.recordwrap, `${this.MId}_records_list`)}>
        {this.state.records.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames(
                s.recorditem,
                `${this.MId}_records_list_item`,
              )}
            >
              <div
                className={classNames(
                  s.prizeimg,
                  `${this.MId}_records_list_item_prizeimg_wrap`,
                )}
              >
                <img
                  className={`${this.MId}_records_list_item_prizeimg`}
                  src={item.prizeImg}
                  alt={item.prizeName}
                />
              </div>
              <div
                className={classNames(
                  s.recordstr,
                  `${this.MId}_records_list_item_text`,
                )}
              >
                <div
                  className={classNames(
                    s.prizename,
                    `${this.MId}_records_list_item_prizename`,
                  )}
                >
                  {item.prizeName}
                </div>
                <div className={s.timeandbutton}>
                  <div
                    className={classNames(
                      s.wintime,
                      `${this.MId}_records_list_item_wintime`,
                    )}
                  >
                    {item.winTime}
                  </div>
                  {item.receiveType === 2 && !item.receiverAddress ? (
                    <button
                      onClick={this.onSaveAddress(item)}
                      className={`${this.MId}_records_list_item_saveaddress`}
                    >
                      填写地址
                    </button>
                  ) : null}
                </div>
                {item.receiverAddress ? (
                  <div
                    className={classNames(
                      s.receiveraddress,
                      `${this.MId}_records_list_item_address`,
                    )}
                  >
                    收货地址:{item.receiverAddress}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <div>暂无中奖记录</div>
    );

  /**
   * 设置玩家基本信息
   * @param phone 设置玩家手机号码
   * @param cardIdRequest 设置领取奖品时是否需要填写身份证1 隐藏，2 验证，3 为空时不验证有填写时验证，4 不验证
   */
  useConfig = (...args: ArgumentsItem[]) => {
    const { phone, cardIdRequest } = getArguments(args);
    this.setState({
      phoneAndRCardId: {
        phone,
        cardIdRequest,
      },
    });
  };

  /**
   * 设置中奖弹窗
   * @param title 中奖弹窗标题
   * @param animation 中奖弹窗动画
   */

  setSuccessModal = (...args: ArgumentsItem[]) => {
    const { title, animation } = getArguments(args);
    this.setState({
      successmodalParams: { title, animation },
    });
  };

  /**
   * 检查抽奖
   * @param enabled
   * @param message
   */
  checkedLottery = (...args: ArgumentsItem[]) => {
    const { enabled, message } = getArguments(args);
    this.checked = { enabled, message };
  };

  // hank 等待
  setDelayStart = () =>
    new Promise((res) =>
      setTimeout(() => {
        this.props.eventDispatch().onStart();
        res(null);
      }),
    );

  /**
   * 开始抽奖
   * */
  startLottery = async () => {
    // step1、执行前置api 用于抽奖前检查是否满足抽奖条件
    await this.apiBeforeStart();

    // step2 执行抽奖事件
    await this.setDelayStart();
    // step3、检查状态是否可以抽奖
    if (!this.checked.enabled) {
      console.log('没有权限，请勿抽奖！');
      message.error(this.checked?.message || '暂无抽奖权限！');
      throw this.checked?.message;
    }

    // step4、返回抽奖接口
    const settedApi = (await this.apiStart()) as AnyObjectType;

    // step5、执行结束事件，可用于重置数据
    this.props.eventDispatch()?.onEnd();
    if (settedApi?.response?.prizeId !== undefined) {
      let currentPrize = getPrizeById(
        settedApi.response.prizeId,
        this.state.prizes,
      );
      // 回填当前操作奖品
      this.winInfo = currentPrize;
      return currentPrize;
    }

    // 没有设置Api时启用mock数据
    if (!settedApi) {
      message.warning('活动奖品或抽奖Api未设置正确, 当前使用模拟抽奖！');
      const winData =
        this.state.prizes[
          Math.floor(Math.random() * this.state.prizes.length - 1)
        ];
      // 回填当前操作奖品
      this.winInfo = winData;
      return winData;
    }
  };

  /**
   *
   * @param receiverPhone 收货人电话
   * @param regionName 收货地址名称
   * @param region 收获地区
   * @param address 收货地址
   * @param idCard 身份证
   */
  setDefaultReceiveInfo = (...args: ArgumentsItem[]) => {
    const { receiverPhone, regionName, region, address, idCard } =
      getArguments(args);
    let argRegionName: any = regionName
      ?.replace(/，/g, ',')
      ?.split(',')
      ?.filter(Boolean);
    const parames = {
      receiverPhone,
      address,
      region: region?.replace(/，/g, ',')?.split(','),
      idCard,
    };
    if (!!argRegionName.length) {
      (parames as any).regionName = argRegionName;
    }

    this.gameHandle?.game.current?.core.AddressModal.updateParams(
      parames as any,
    );
    this.setState({
      receiverInfo: parames,
    });
  };

  /**通过其他事件关联抽奖 */
  lottery = () => this.gameHandle?.game.current?.core.lottery();

  /**显示中奖记录 */
  showRecord = async () => {
    await this.apiGetRecord();
    this.setState({ displayRecord: true });
  };

  /**显示活动规则 */
  showRules = () => this.setState({ displayRule: true });

  render() {
    const { moduleId } = this.props;
    const { 
      phoneAndRCardId, 
      successmodalParams, 
      type, 
      prizes, 
      receiverInfo,
      displayRecord,
      disablePullUp,
      disablePullDown,
      displayRule,
      ruleText
    } = this.state;
    return (
      <Wrapper {...this.props}>
        <Game
          parentId={`${this.MId}_wrap`}
          className={`gametarget${moduleId}_gameroot`}
          targetId={this.MId}
          playerPhone={phoneAndRCardId?.phone}
          successModalTitle={successmodalParams.title || '恭喜您，获得'}
          successModalAnimation={{
            form: successmodalParams.animation || 'flipInY',
          }}
          type={type}
          cardIdRequest={phoneAndRCardId?.cardIdRequest}
          ref={(ref) => this.gameHandle = ref}
          start={this.startLottery}
          prizes={prizes}
          saveAddress={this.apiSaveAddress}
          receiverInfo={receiverInfo}
          onCancel={() => this.props.eventDispatch().onCancel()}
          onEnsure={() => this.props.eventDispatch().onEnsure()}
          checkVerificationCode={this.checkVerificationCode}
          onShowSuccess={() => this.props.eventDispatch()?.onShowSuccess()}
          onShowFailed={() => this.props.eventDispatch()?.onShowFailed()}
          onShowAddress={() => this.props.eventDispatch()?.onShowAddress()}
        />
        <GameRecords
          id={`${this.MId}_records`}
          visible={displayRecord}
          onCancel={() => this.setState({displayRecord: false})}
          disablePullUp={disablePullUp}
          disablePullDown={disablePullDown}
          onPullDown={async () => console.log()}
          onPullUp={async () => console.log()}
        >
          {this.renderRecords()}
        </GameRecords>
        <GameModal
          id={`${this.MId}_rules`}
          visible={displayRule}
          title="活动规则"
          okText="返回抽奖"
          onOk={() => this.setState({ displayRule: false})}
          onCancel={() => this.setState({ displayRule: false})}
        >
          <ol className={classNames(s.rule, `${this.MId}_rules_list`)}>
            {ruleText.map((item, key) => (
              <li className={`${this.MId}_rules_list_item`} key={key}>
                {item}
              </li>
            ))}
          </ol>
        </GameModal>
      </Wrapper>
    );
  }
}

const mapState = (state: RootState) => ({
  runningTimes: state.runningTimes,
  currentEditorStylePath: state.controller.currentEditorStylePath,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setRunningTimes: dispatch.runningTimes.setRunningTimes,
});

// typeof State
type State = {
  /** 奖品 */
  prizes: Prize[];
  /** 电话与身份证id */
  phoneAndRCardId: AnyObjectType;
  /** 收货人信息 */
  receiverInfo: AnyObjectType;
  /** 成功弹窗参数 */
  successmodalParams: AnyObjectType;
  /** 游戏类型 */
  type: keyof GameMap;
  /** 显示中奖记录 */
  displayRecord: boolean;
  /** 显示规则 */
  displayRule: boolean;
  /** 规则内容 */
  ruleText: string[];
  /** 中奖记录内容 */
  records: RecordsType[];
  /** 禁用下拉 */
  disablePullDown: boolean;
  /** 禁用上拉 */
  disablePullUp: boolean;
  text: string;
};

// typeof Props
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export type LotteryProps = ClassModuleBaseProps<
  {},
  { [keys in ExposeEventsKeys]: Function }
> &
  StateProps &
  DispatchProps;

export default connect(
  mapState,
  mapDispatch,
)(PresetModule<LotteryProps>(Lottery, config));
