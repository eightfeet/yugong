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
          [`& .${id}_successmodal_close`]: (styleCompiler(style.successclose).style || {}),
          [`& .${id}_successmodal_modify:first-child`]: (styleCompiler(style.successmodify1).style || {}),
          [`& .${id}_successmodal_modify:nth-child(1)`]: (styleCompiler(style.successmodify2).style || {}),
          [`& .${id}_successmodal_modify:nth-child(2)`]: (styleCompiler(style.successmodify3).style || {}),
          [`& .${id}_successmodal_modify:nth-child(3)`]: (styleCompiler(style.successmodify4).style || {}),
          [`& .${id}_successmodal_ok`]: (styleCompiler(style.successok).style || {}),
          [`& .${id}_successmodal_ok:disabled`]: (styleCompiler(style.successokdisabled).style || {}),
          [`& .${id}_successmodal_cancel`]: (styleCompiler(style.successcancel).style || {}),
          [`& .${id}_successmodal_cancel:disabled`]: (styleCompiler(style.successcanceldisabled).style || {})
        }
      }
});

export default useStyles;

