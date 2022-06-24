/**
 * 高阶组件，支持拖拽方式变更事件排序，同时处理参数面板：模块->事件->参数，
 */
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";
import { RootState } from "~/redux/store";
import { ExposeFunctions } from "~/types/modules";
import EventItem from "./EventItem";
import App from "~/components/Output";
import { EventDataList } from "./EventGroup";
import ArgumentsSetting from "../ArgumentsSetting";
import { ArgumentsItem } from "~/types/appData";

interface Props {
  moduleEvents: EventDataList[];
  onChange: (data: EventDataList[]) => void;
  onMinus: (index: number) => void;
  handlePlay?: () => void;
}

const EventListHoc = SortableContainer(
  ({ moduleEvents, onChange, onMinus, handlePlay }: Props) => {
    const appData = useSelector((state: RootState) => state.appData);
    const [currentModuleId, setCurrentModuleId] = useState<string>();
    const [argumentsVisible, setArgumentsVisible] = useState(false);
    const [currentFunctionStaticArguments, setCurrentFunctionStaticArguments] =
      useState<ArgumentsItem[]>();
    const [currentFunctionArguments, setCurrentFunctionArguments] =
      useState<ArgumentsItem[]>();
      const [currentIndex, setCurrentIndex] = useState<number>()

    /**
     * 获取方法对应的参数
     */
    const getFunArguments = useCallback(
      (moduleId: string): ExposeFunctions[] => {
        if (moduleId === "global") {
          return App.exposeFunctions || [];
        }
        for (let index = 0; index < appData.length; index++) {
          const element = appData[index];
          if (moduleId === element.moduleId) {
            return require(`~/modules/${element.type}`).default.exposeFunctions;
          }
        }
        return [];
      },
      [appData]
    );

    const onSetArg = useCallback(
      (
        currentFunctionStaticArguments: ArgumentsItem[],
        currentFunctionArguments: ArgumentsItem[],
        moduleId: string,
        index: number
      ) => {
        // 保存当前编辑面板静态参数
        setCurrentFunctionStaticArguments(currentFunctionStaticArguments);
        // 保存当前编辑面板运行时参数
        setCurrentFunctionArguments(currentFunctionArguments);
        // 保存当前模块id
        setCurrentModuleId(moduleId);
        // 保存当前索引位
        setCurrentIndex(index);
        // 开启参数编辑面板
        setArgumentsVisible(true);
      },
      []
    );

    const handleEventItem = (
      event: EventDataList    ): {
      disableSetArguments: boolean;
      currentStaticArguments: ArgumentsItem[];
    } => {
      const { moduleUuid, dispatchedFunctions } = event;
      // 参数不可编辑
      let disableSetArguments = false;
      // 获取当前模块静态导出的方法
      const currentModuleExportFunction = getFunArguments(moduleUuid) || [];
      // 从当前模块静态导出的方法中提取静态参数
      const currentStaticArguments =
        currentModuleExportFunction.filter(
          (item) => item.name === dispatchedFunctions
        )[0]?.arguments || [];
      // 无方法名（还没有选择运行时模块或模块对应的方法） 或者没有静态参数时标示当前参数不可编辑
      if (!dispatchedFunctions || !currentStaticArguments.length) {
        disableSetArguments = true;
      }

      return {
        disableSetArguments,
        currentStaticArguments,
      };
    };

    /**保存参数 */
    const onSaveArgs = useCallback(
      (data) => {
        const operateEvents = [...moduleEvents];
        operateEvents.forEach((item, index) => {
          if (item.moduleUuid === currentModuleId && index === currentIndex) {
            item.arguments = [...data];
          }
        });

        if (onChange instanceof Function) {
          onChange(operateEvents);
        }

        if (handlePlay instanceof Function) {
          handlePlay();
        }
        
        setArgumentsVisible(false);
      },
      [currentIndex, currentModuleId, handlePlay, moduleEvents, onChange]
    );

    // 单项数据的更新
    const onChangeItem = useCallback(
      (index: number) => (data: string[]) => {
        const operateEvents = [...moduleEvents];
        // moduleUuid
        operateEvents[index] = {
          arguments: [],
          dispatchedFunctions: data[1],
          moduleUuid: data[0],
        };
        if (onChange instanceof Function) {
          onChange(operateEvents);
        }
      },
      [moduleEvents, onChange]
    );

    return (
      <div>
        {
          // 当前模块发布的事件状态清单
          moduleEvents?.map((event, index) => {
            const { disableSetArguments, currentStaticArguments } =
              handleEventItem(event);

            return (
              <EventItem
                index={index}
                key={`${index}${event.moduleUuid}${event.dispatchedFunctions}`}
                moduleUuid={event.moduleUuid}
                dispatchedFunctions={event.dispatchedFunctions}
                argumentList={event.arguments || []}
                onChange={onChangeItem(index)}
                onMinus={() => onMinus(index)}
                canNotSetArguments={disableSetArguments}
                onSetArg={() =>
                  onSetArg(
                    currentStaticArguments,
                    event.arguments || [],
                    event.moduleUuid,
                    index
                  )
                }
              />
            );
          })
        }
        <ArgumentsSetting
          title="参数设置"
          visible={argumentsVisible}
          onOk={onSaveArgs}
          argumentsData={currentFunctionArguments}
          initArgumentData={currentFunctionStaticArguments}
          onCancel={() => setArgumentsVisible(false)}
        />
      </div>
    );
  }
);

export default EventListHoc;
