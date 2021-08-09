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
const WH = window.innerHeight;
const useStyles = (id: string) => createUseStyles<string, any>({
    
    wrap: (style) => {
        return {
          ...(styleCompiler(style.wrap).style || {}),
          [`& .${id}_light`]: (styleCompiler(style.light).style || {}),
          [`& .${id}_wheel`]: (styleCompiler(style.wheel).style || {}),
          [`& .${id}_divide`]: (styleCompiler(style.divide).style || {}),
          [`& .${id}_prizealias`]: (styleCompiler(style.prizealias).style || {}),
          [`& .${id}_lotterybutton`]: (styleCompiler(style.lotterybutton).style || {}),
          [`& .${id}_needle`]: (styleCompiler(style.needle).style || {}),
          [`& .${id}_gameImg`]: (styleCompiler(style.gameImg).style || {}),
        };
      },

      successModal: (style) => {
        return {
          /**中奖弹窗 */
          // successmodal_content_wrap
          [`& .${id}_successmodal_overlay`]: (styleCompiler(style.successoverlay).style || {}),
          [`& .${id}_successmodal_content`]: (styleCompiler(style.successcontainer).style || {}),
          [`& .${id}_successmodal_modules`]: (styleCompiler(style.successcontent).style || {}),
          [`& .${id}_successmodal_header`]: (styleCompiler(style.successheader).style || {}),
          [`& .${id}_successmodal_article`]: (styleCompiler(style.successarticle).style || {}),
          [`& .${id}_successmodal_prizename`]: (styleCompiler(style.successmodalprizename).style || {}),
          [`& .${id}_successmodal_prizeimg`]: (styleCompiler(style.successmodalprizeimg).style || {}),
          [`& .${id}_successmodal_memo`]: (styleCompiler(style.successmodalmemo).style || {}),
          [`& .${id}_successmodal_close`]: (styleCompiler(style.successclose).style || {}),
          [`& .${id}_successmodal_modify`]: (styleCompiler(style.successmodify1).style || {}),
          [`& .${id}_successmodal_submit`]: (styleCompiler(style.successok).style || {}),
        }
      },

      failedModal: (style) => {
        return {
          /**中奖弹窗 */
          // failedmodal_content_wrap
          [`& .${id}_failedmodal_overlay`]: (styleCompiler(style.failedoverlay).style || {}),
          [`& .${id}_failedmodal_content`]: (styleCompiler(style.failedcontainer).style || {}),
          [`& .${id}_failedmodal_modules`]: (styleCompiler(style.failedcontent).style || {}),
          [`& .${id}_failedmodal_header`]: (styleCompiler(style.failedheader).style || {}),
          [`& .${id}_failedmodal_article`]: (styleCompiler(style.failedarticle).style || {}),
          [`& .${id}_failedmodal_prizename`]: (styleCompiler(style.failedmodalprizename).style || {}),
          [`& .${id}_failedmodal_prizeimg`]: (styleCompiler(style.failedmodalprizeimg).style || {}),
          [`& .${id}_failedmodal_memo`]: (styleCompiler(style.failedmodalmemo).style || {}),
          [`& .${id}_failedmodal_close`]: (styleCompiler(style.failedclose).style || {}),
          [`& .${id}_failedmodal_modify`]: (styleCompiler(style.failedmodify1).style || {}),
          [`& .${id}_failedmodal_submit`]: (styleCompiler(style.failedok).style || {}),
        }
      },

      addressModal: (style) => {
        return {
          /**中奖弹窗 */
          [`& .${id}_addressmodal_overlay`]: (styleCompiler(style.addressmodaloverlay).style || {}),
          [`& .${id}_addressmodal_content`]: (styleCompiler(style.addressmodalcontent).style || {}),
          [`& .${id}_addressmodal_modules`]: (styleCompiler(style.addressmodalcontent).style || {}),
          [`& .${id}_addressmodal_formbox`]: (styleCompiler(style.addressmodalformbox).style || {}),
          [`& .address__content h3.${id}_addressmodal_header`]: (styleCompiler(style.addressmodalheader).style || {}),
          [`& .${id}_addressmodal_player`]: (styleCompiler(style.addressmodalplayer).style || {}),
          [`& .${id}_addressmodal_row`]: (styleCompiler(style.addressmodalrow).style || {}),
          [`& .${id}_addressmodal_label`]: (styleCompiler(style.addressmodallabel).style || {}),
          [`& .${id}_addressmodal_subtitle`]: (styleCompiler(style.addressmodalsubtitle).style || {}),
          [`& .${id}_addressmodal_input`]: (styleCompiler(style.addressmodalinput).style || {}),
          '& .address__check__phone': (styleCompiler(style.addresscheckphone).style || {}),
          '& .address__check__phone__disable': (styleCompiler(style.addresscheckphonedisable).style || {}),
          [`& .${id}_addressmodal_close`]: (styleCompiler(style.addressmodalclose).style || {}),
          [`& .${id}_addressmodal_modify`]: (styleCompiler(style.addressmodify1).style || {}),
          [`& .${id}_addressmodal_footer button.${id}_addressmodal_submit`]: (styleCompiler(style.addressmodalok).style || {}),
        }
      },

      recordModalContent: (style) => ({height:  `${WH - 100}px`, ...(styleCompiler(style.recordmodalcontent).style || {})}),
      recordModalClose: (style) => (styleCompiler(style.recordmodalclose).style || {}),
});

export default useStyles;
