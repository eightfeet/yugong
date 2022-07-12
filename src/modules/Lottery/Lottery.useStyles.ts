import { useCallback, useEffect } from "react";
import jss from "jss";
import styleCompiler from "~/compiler";
import { createUseStyles } from "react-jss";
import { GameMap } from "~/components/Game/useGame";
import { buildGamesStyle, buildPublicModalStyle } from "./helper";
import { addImportant } from "~/core/helper/toStyles";

const getParames = (id: string, moduleId: string, style: any, type: keyof GameMap) => ({
  [`& .${moduleId}_gameroot`]: addImportant(styleCompiler(style.gameroot).style || {}),
  ...buildPublicModalStyle(id, "successmodal", style),
  ...buildPublicModalStyle(id, "failedmodal", style),
  ...buildPublicModalStyle(id, "addressmodal", style),
  ...buildPublicModalStyle(id, "records", style),
  ...buildPublicModalStyle(id, "rules", style),
  ...buildGamesStyle(id, style, type),
});

const headDom = document.head;

const useStyles = (moduleId: string, style: any, type: keyof GameMap) => {
  const target = `gametarget${moduleId}_`;
  const id = `gametarget${moduleId}_${type}`;
  const createStyleParames = useCallback(() => {
    return {
      [id]: getParames(id, moduleId, style, type),
    };
  }, [id, moduleId, style, type]);

  const setDom = useCallback(() => {
    let style = headDom?.querySelector(`#${id}_style`);
    if (!style) {
      style = document.createElement("style");
      style.id = `${id}_style`;
      document.head.appendChild(style);
    }
    
    const data = jss.createStyleSheet<string>(createStyleParames(), { generateId: () => id });
    style.innerHTML = data.toString();
    const classArr = [
      `${target}boxroulette`,
      `${target}roulette`,
      `${target}flipcard`,
      `${target}slotmachine`,
      `${target}dice`,
      `${target}case`,
      `${target}redenvelope`];
    document.body.classList.remove(...classArr);
    document.body.classList.add(id);
  }, [createStyleParames, id, target]);

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
