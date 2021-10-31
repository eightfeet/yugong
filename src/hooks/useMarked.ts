import parser from "html-react-parser";
import "highlight.js/scss/vs.scss";
import highlightjs from "highlight.js";
import marked from "marked";
import { useCallback, useState } from "react";

/**
 * hooks用于将markde自负串转换为react JSX.Element
 *
 * 这里使用lightjs高亮处理md内部代码块
 * 默认typescript显示规则
 *
 * 首先通过markedjs将md字符串转换为html字符串
 * 然后通过html-react-parser将html字符串转换为jsx
 */

// 设置marked
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = highlightjs;
    const language = hljs.getLanguage(lang) ? lang : "typescript";
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const useMarked: (
  initialState?: string | JSX.Element | JSX.Element[]
) => [
  string | JSX.Element | JSX.Element[] | undefined,
  (markedString: string) => void
] = (initialState) => {
  // 存储转译结果
  const [result, setToResult] = useState<
    string | JSX.Element | JSX.Element[] | undefined
  >(initialState);

  const setResult = useCallback((markedString: string) => {
    const text = marked(markedString);
    const result = parser(text);
    setToResult(result);
  }, []);
  // 将结果返回
  return [result, setResult];
};

export default useMarked;
