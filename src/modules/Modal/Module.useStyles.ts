import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = (id: string) => createUseStyles<string, any>({
    root: (style) => {
        return {
          ...(styleCompiler(style.normal).style || {}),
          [`& .${id}_overlay`]: (styleCompiler(style.overlay).style || {}),
          [`& .${id}_modules`]: {
            backgroundColor: 'transparent'
          }
        };
      },
      container: (style) => (styleCompiler(style.container).style || {}),
      content: (style) => (styleCompiler(style.content).style || {}),
      close: (style) => (styleCompiler(style.close).style || {}),
      header: (style) => (styleCompiler(style.header).style || {}),
      article: (style) => (styleCompiler(style.article).style || {}),
      footer: (style) => (styleCompiler(style.footer).style || {}),
      button: (style) => (styleCompiler(style.button).style || {}),
      okButton: (style) => (styleCompiler(style.okButton).style || {}),
      cancelButton: (style) => (styleCompiler(style.cancelButton).style || {}),
});

export default useStyles;
