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
    root: (style) => {
        return {
          ...(styleCompiler(style.normal).style || {}),
          [`& .${id}_overlay`]: (styleCompiler(style.overlay).style || {}),
          [`& .${id}_content`]: (styleCompiler(style.container).style || {}),
          [`& .${id}_modules`]: (styleCompiler(style.content).style || {}),
          [`& .${id}_header`]: (styleCompiler(style.header).style || {}),
          [`& .${id}_article`]: (styleCompiler(style.article).style || {}),
          [`& .${id}_close`]: (styleCompiler(style.close).style || {}),
          [`& .${id}_modify:first-child`]: (styleCompiler(style.modify1).style || {})
        };
      },
});

export default useStyles;

