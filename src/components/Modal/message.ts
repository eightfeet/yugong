import Modal from '@eightfeet/modal';
import s from './Modal.module.scss';
import { content, close, overlay } from './defaultTheme';

const style: any = {
  overlay,
  content,
  close,
};

const parames = {
  closable: true, // modal是否可关闭 默认true
  style,
};

const modal = new Modal(parames);

export interface MessageParames {
  /**弹窗标题 */
  title?: string;
  /**内容 */
  content: string;
  /**按钮 */
  onOk?: (modal: Modal) => void;
  /**按钮文字*/
  okText?: string;
}
export const message = async ({
  content,
  title,
  onOk,
  okText,
}: MessageParames) => {
  try {
    await modal.create({
      article: `<div class="${s.root}"> ${
        title?.length ? `<header>${title}</header>` : ''
      }<section class="${s.message} ${
        typeof onOk !== 'function' && title?.length ? s.offsetbottom : ''
      }">${content}</section>${
        typeof onOk === 'function'
          ? `<footer><button class="modalsubmit ${s.submit}">${
              okText || '确定'
            }</button></footer>`
          : ''
      }</div>`,
    });
    if (typeof onOk === 'function') {
      const button: any = modal.state.contentDom?.querySelector('.modalsubmit');
      if (button) button.onclick = () => onOk(modal);
    }
  } catch (error) {
    console.error(error);
  }
};

export default message;
