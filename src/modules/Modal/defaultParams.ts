import { ModalParameters } from '@eightfeet/modal';

interface parames {
    /**所创建弹窗的id */
    id: string;
    /**入出场动画类型 */
    animationType?:
        | 'fadeInLeft'
        | 'fadeInRight'
        | 'fadeInDown'
        | 'fadeInUp'
        | 'zoomInLeft'
        | 'zoomInRight'
        | 'zoomInDown'
        | 'zoomInUp'
        | 'zoomIn'
        | 'flipInX'
        | 'flipInY';
    /**入出场动画类持续时间 */
    animationDuration?: string | number;
    /**弹窗是否可关闭  默认true*/
    closable?: boolean;
    /**点击背景层关闭弹窗 默认false */
    shouldCloseOnOverlayClick?: boolean;
    parentId?: string;
    onCancel: () => void;
}

export const buildParams = ({
    id,
    parentId,
    animationType,
    animationDuration,
    closable,
    shouldCloseOnOverlayClick,
    onCancel,
}: parames): ModalParameters => {
    return {
        id, // 所创建弹窗的id 不传可自动生成id（modal + 时间戳 + 100以内的随机数）
        parentId,
        zIndex: 100, // modal的层级关系，默认100
        animation: {
            form: animationType,
            duration: animationDuration,
        }, // 启用动画 默认true
        closable, // modal是否可关闭 默认true
        shouldCloseOnOverlayClick, // 点击背景层关闭弹窗 默认false
        style: {
            close: { fontStyle: 'normal' },
            modify: [{fontStyle: 'normal'}, {fontStyle: 'normal'}, {fontStyle: 'normal'}],
        },
        customModifyZIndex: true,
        onCancel,
    };
};
