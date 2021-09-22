import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";
// overlay: "覆盖层",
// content: "内容区",
// header: "头部",
// article: "内容区",
// close: "关闭按钮",
// modify1: "修饰器1",
// modify2: "修饰器2",
// modify3: "修饰器3"

const handlePublicModal = (MID: string, modal: string, style: any) => ({
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_overlay`]: (styleCompiler(style.dialog_overlay).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_content_wrap`]: (styleCompiler(style.dialog_content_wrap).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_content`]: (styleCompiler(style.dialog_content).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_modules`]: (styleCompiler(style.dialog_modules).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_article`]: (styleCompiler(style.dialog_article).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_close`]: (styleCompiler(style.dialog_close).style || {}),
})

const WH = window.innerHeight;
const useStyles = (id: string) => createUseStyles<string, any>({
    wrap: (style) => {
        return {
        };
      },

      successModal: (style) => {
        return {
          /**中奖弹窗 */
          // successmodal_content_wrap
          ...(handlePublicModal(id, 'successmodal', style)),
        }
      },

      failedModal: (style) => {
        return {
          /**中奖弹窗 */
          // failedmodal_content_wrap
          ...(handlePublicModal(id, 'failedmodal', style)),
        }
      },

      addressModal: (style) => {
        return {
          /**地址弹窗 */
          ...(handlePublicModal(id, 'addressmodal', style)),
        }
      },

      recordsModal: (style) => {
        return {
          /**中奖记录弹窗 */
          ...(handlePublicModal(id, 'addressmodal', style)),
        }
      },

      rulesModal: (style) => {
        return {
          /**中奖记录弹窗 */
          ...(handlePublicModal(id, 'rules', style)),
        }
      },
      
});

export default useStyles;
