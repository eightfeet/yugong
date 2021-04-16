
/**
 * 编辑App时App与编辑器两端redux数据结构必须一致，
 * 
 * 缘由：
 * 为实现所见即所得，项目在编辑器中采用iframe来呈现app的原始样貌，这样就需要
 * App与编辑器数据同步，我们通过postMessage来做iframe的两端关键数据的同步通信，
 * 然而，不希望在项目开发的时侯既要考虑逻辑处理，又要去处理两端数据同步，而且极易出错，
 * 所以希望统一由一个数据调度中心来调度数据。
 * 
 * 思路：
 * 通过watcher监控数据的变更，来修改对应端的的redux数据。
 * 
 * 方案：
 * 对于iframe两端来说通过postMessage传递的数据对象必定不等于原数据对象，即便两边对象数据一至。
 * 这样就需要一个diffrence层来比较两端数据，如果新传数据与源数据没有差异，则不更新redux数据。
 * 
 * 选择：
 * 第一时间想到的JSON.stringify(ObjectA) === JSON.stringify(ObjectB),可选方案上从性能来看必定是最优选择，
 * 但是他无法做到真正意义上的深度对比，比如ObjectA与ObjectB数据一至，但数据顺序不一致就认为两个数据不同
 * 这显然不是我们想要的，所以选用deep-equal来做真正意义上的深度对比，性能上有所折损，但还是在可以接受的范围
 * 具体对比与性能问题参考https://www.mattzeunert.com/2016/01/28/javascript-deep-equal.html
 * 
 * 
 * ==================================================================================================
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import deepEqual from 'deep-equal';
import { Dispatch, RootState } from "~/redux/store";
import usePostMessage from "./usePostMessage";

/**
 * @param {Window} targetWindow 信息推送目标窗口
 */
const useAppDashboardDataSync = (targetWindow: Window) => {
    const { controller, activationItem, appData, pageData, runningTimes} = useDispatch<Dispatch>();
    const state = useSelector((state: RootState) => state)

    const sendMessage = usePostMessage(({ tag, value }) => {
        // 接受message 判断是否更新redux;
        switch (tag) {
            case 'id':
                if (state.controller.editingId !== value) {
                    controller.setEditingId(value);
                }
                break;
            case 'removeActivationItem':
                activationItem.removeActivationItem();
                break;
            case 'setIsEditing':
                if (state.controller.isEditing !== value) {
                    controller.setIsEditing(value);
                }
                break;
            case 'updateActivationItem':
                // diff
                if (!deepEqual(state.activationItem, value)) {
                    activationItem.updateActivationItem(value);
                }
                break;
            case 'updateAppData':
                // diff
                if (!deepEqual(state.appData, value)) {
                    appData.updateAppData(value);
                }
                break;
            case 'updatePage':
                // diff
                if (!deepEqual(state.pageData, value)) {
                    pageData.updatePage(value)
                }
                break;
            case 'updateRunningTimes':
                // diff
                if (!deepEqual(state.runningTimes, value)) {
                    runningTimes.setRunningTimes(value)
                }
                break;
            default:
                break;
        }

    });

    // id watcher
    useEffect(() => {
        sendMessage({
            tag: 'id',
            value: state.controller.editingId
        }, targetWindow)
    }, [sendMessage, state.controller.editingId, targetWindow]);

    // isEditing watcher
    useEffect(() => {
        sendMessage({
            tag: 'setIsEditing',
            value: state.controller.isEditing
        }, targetWindow)
    }, [sendMessage, state.controller.isEditing, targetWindow]);

    // activationItem watcher
    useEffect(() => {
        sendMessage({
            tag: 'updateActivationItem',
            value: state.activationItem
        }, targetWindow)
    }, [sendMessage, state.activationItem, targetWindow]);

    // appData watcher
    useEffect(() => {
        sendMessage({
            tag: 'updateAppData',
            value: state.appData
        }, targetWindow)
    }, [sendMessage, state.appData, targetWindow]);

    // pageData watcher
    useEffect(() => {
        sendMessage({
            tag: 'updatePage',
            value: state.pageData
        }, targetWindow)
    }, [sendMessage, state.pageData, targetWindow]);

    // runningTimes watcher
    useEffect(() => {
        sendMessage({
            tag: 'updateRunningTimes',
            value: state.runningTimes
        }, targetWindow)
    }, [sendMessage, state.runningTimes, targetWindow]);
}

export default useAppDashboardDataSync; 
