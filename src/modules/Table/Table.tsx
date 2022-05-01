
import { Component } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import classNames from 'classnames';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import PresetModule from '~/components/PresetModule';
import requester from '~/core/fetch';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsArray, ArgumentsBoolean, ArgumentsNumber, ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';

import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Table.config';
import createStyles, { ClassesKey } from './Table.createStyles';

import s from './Table.module.less';

class Table extends Component<TableProps, State> {
  constructor(props: TableProps) {
    super(props)
    this.state = {
      theadDataStatu: undefined
    }
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  /**设置表格交互 */
  setTable = (isPullDown: ArgumentsBoolean, isPullUp: ArgumentsBoolean) => {
    this.setState({
      pullStates: {
        pullDown: getArgumentsItem(isPullDown) as boolean,
        pullUp: getArgumentsItem(isPullUp) as boolean,
      }
    })
  };

  /**设置表格头部 */
  setTheadData = (argsName: ArgumentsArray, argWidth: ArgumentsArray) => {
    const data = getArgumentsItem(argsName);
    const width = getArgumentsItem(argWidth);
    this.setState({
      theadDataStatu: { data: data as any[], width: width as any[] }
    })
  };

  /**设置表格数据 */
  setTbodyData =
    (
      dataSource: ArgumentsArray,
      isConcate: ArgumentsBoolean,
      rowMap: ArgumentsArray
    ) => {
      const data = getArgumentsItem(dataSource);
      this.setState({
        copyDataSource: data
      })
      const concat = getArgumentsItem(isConcate);
      // 这里单独处理，定义列数据从原数据映射
      const map = rowMap.data;
      if (!Array.isArray(data)) {
        return;
      }

      const result: any[] = [];
      data.forEach((element) => {
        const temp: any[] = [];
        if (Array.isArray(map)) {
          map.forEach((item) => {
            if (item) {
              temp.push(parse(getResult(item, element)));
            }
          });
        }
        result.push(temp);
      });
      // 递增翻页

      this.setState({
        tbodyDataStatu: concat ? this.state.tbodyDataStatu?.concat(result) : result
      })
    };

  /**
     * 从数据源覆写表格，做到表格项灵活覆写，满足列表样式的各种变换
     *
     * */
  overrideTbodyItem = (
      rowItem: ArgumentsNumber,
      colItem: ArgumentsNumber,
      override: ArgumentsString
    ) => {
      const {tbodyDataStatu, copyDataSource} = this.state;
      const row = (getArgumentsItem(rowItem) as number) - 1;
      const col = (getArgumentsItem(colItem) as number) - 1;

      if (
        tbodyDataStatu?.[row] &&
        tbodyDataStatu?.[row][col] &&
        copyDataSource
      ) {
        const optTbodyDataStatu = [...tbodyDataStatu];
        optTbodyDataStatu[row][col] = getArgumentsItem(
          override,
          copyDataSource[row]
        );
        this.setState({
          tbodyDataStatu: optTbodyDataStatu
        });
      }
    };

  /**init */
  onMount = async () => {
    const { setTable, setTheadData, setTbodyData, overrideTbodyItem } = this;
    const { api, } = this.props;
    this.props.registersFunction({
      setTable, setTheadData, setTbodyData, overrideTbodyItem
    });
    const apiArguments = api?.find((item) => item.apiId === 'mount');
    if (apiArguments) {
      await requester(apiArguments || {});
    }
    this.props.eventDispatch().mount();
  }

  /** 下拉事件*/
  onPullDown = async () => {
    const { api, eventDispatch } = this.props;
    const apiArguments = api?.find((item) => item.apiId === 'pullDown');
    if (apiArguments) {
      await requester(apiArguments || {});
    }
    // 执行下拉事务
    eventDispatch().pullDown();
  };

  onPullUp = async () => {
    const { api, eventDispatch } = this.props;
    const apiArguments = api?.find((item) => item.apiId === 'pullUp');
    if (apiArguments) {
      await requester(apiArguments || {});
    }
    // 执行下拉事务
    eventDispatch().pullUp();
  };

  render() {
    const { classes } = this.props;
    const { pullStates, theadDataStatu, tbodyDataStatu } = this.state;
    return (
      <Wrapper {...this.props} maxHeight maxWidth>
        <div className={s.tablewrap}>
          <PullToRefresh
            className={s.bg_orange}
            onPullDown={this.onPullDown}
            disablePullUp={!pullStates?.pullUp}
            disablePullDown={!pullStates?.pullDown}
            pullDownText="下拉更新"
            pullUpText="上拉更新"
            onPullUp={this.onPullUp}
          >
            <table className={classNames(s.table, classes.table)}>
              {theadDataStatu?.data.length ? (
                <thead>
                  <tr>
                    {theadDataStatu.data.map((item, index) => (
                      <th
                        key={index}
                        scope="col"
                        style={{
                          width: theadDataStatu.width[
                            index
                          ],
                        }}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : null}
              {tbodyDataStatu?.length ? (
                <tbody>
                  {tbodyDataStatu.map((item, ind) => (
                    <tr key={ind}>
                      {item.map((itemsub, index) => (
                        <td key={index}>{itemsub}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ) : null}
            </table>
          </PullToRefresh>
        </div>
      </Wrapper>
    )
  }
}

const mapState = (state: RootState) => ({
  runningTimes: state.runningTimes,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setRunningTimes: dispatch.runningTimes.setRunningTimes,
})

// typeof State
type State = {
  theadDataStatu?: {
    width: any[];
    data: React.ReactNode[];
  },
  tbodyDataStatu?: any[][];
  pullStates?: {
    pullDown: boolean;
    pullUp: boolean;
  };
  copyDataSource?: any
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type TableProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<TableProps>(Table, config, createStyles))
