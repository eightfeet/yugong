import { useCallback, useEffect } from "react";
import jss from "jss";
import styleCompiler from "~/compiler";
import { createUseStyles } from "react-jss";
import { GameMap } from "~/components/Game/useGame";
import { buildGamesStyle, buildPublicModalStyle } from "./helper";

const getParames = (id: string, style: any, type: keyof GameMap) => ({
  [`& .${id.split('_')[0]}_gameroot`]: styleCompiler(style.gameroot).style || {},
  ...buildPublicModalStyle(id, "successmodal", style),
  ...buildPublicModalStyle(id, "failedmodal", style),
  ...buildPublicModalStyle(id, "addressmodal", style),
  ...buildPublicModalStyle(id, "records", style),
  ...buildPublicModalStyle(id, "rules", style),
  ...buildGamesStyle(id, style, type),
});

const headDom = document.head;

const useStyles = (id: string, style: any, type: keyof GameMap) => {
  const createStyleParames = useCallback(() => {
    return {
      [id]: getParames(id, style, type),
    };
  }, [id, style, type]);

  const setDom = useCallback(() => {
    let style = headDom?.querySelector(`#${id}_style`);
    if (!style) {
      style = document.createElement("style");
      style.id = `${id}_style`;
      document.head.appendChild(style);
    }
    const data = jss.createStyleSheet<string>(createStyleParames());
    style.innerHTML = data.toString();
    document.body.classList.add(data.classes[Object.keys(data.classes)[0]]);
  }, [createStyleParames, id]);

  const removeDom = useCallback(() => {
    let style = headDom?.querySelector(`#${id}_style`);
    if (style) {
      headDom.removeChild(style);
    }
  }, [id]);

  useEffect(() => {
    setDom();
    return () => {
      removeDom();
    };
  }, [removeDom, setDom]);

  return createUseStyles<string, any>(createStyleParames())();
};

export default useStyles;
