import { useCallback, useEffect, useState } from "react";
import jss from "jss";
import styleCompiler from "~/compiler";
import { createUseStyles } from "react-jss";
import { GameMap } from "~/components/Game/useGame";

const games = (MID: string, style: any, type: keyof GameMap) => {
  const prefix = `& .${MID}_`;

  const compiler = (name: string) =>
    styleCompiler(style[`${type}_${name}`]).style || {};

  const buildStyle = (name: string, style: { [keys: string]: any }) => {
    style[`${prefix}${name}`] = compiler(name);
  };

  const groupStyle = {};
  //   gametarget7ee86e35-08ea-408d-918a-e1e9a96f6f60_boxroulette_items_prizealias

  let nameArray: string[] = [];
  switch (type) {
    case "boxroulette":
      nameArray = [
        "items_wrap",
        "items_lottery",
        "items_prizeItem_wrap",
        "items_prizeItem",
        "items_selected_wrap",
        "items_selected",
        "prize",
        "items_gameimg",
        "items_prizealias",
        "items_lotterybuttonwrap",
        "items_lotterybutton",
      ];
      break;
    case "roulette":
      nameArray = [
        "wrap",
        "lottery",
        "wheel",
        "award",
        "prizealias",
        "gameImg",
        "divide",
        "needle",
        "lotterybutton",
      ];
      break;
    default:
      break;
  }
  nameArray.forEach((name: string) => buildStyle(name, groupStyle));
  return groupStyle;
};

const handlePublicModal = (MID: string, modal: string, style: any) => {
  const prefix = `& .${MID}_${modal}_wrap .${MID}_${modal}_`;
  const compiler = (block: string, name: string) =>
    styleCompiler(style[`${block}_${name}`]).style || {};
  const modalStyle = (name: string, style: { [keys: string]: any }) => {
    style[`${prefix}${name}`] = compiler(modal, name);
  };
  const publicModal = {
    [`${prefix}overlay`]: compiler("dialog", "overlay"),
    [`${prefix}content_wrap`]: compiler("dialog", "content_wrap"),
    [`${prefix}content`]: compiler("dialog", "content"),
    [`${prefix}modules`]: compiler("dialog", "modules"),
    [`${prefix}article`]: compiler("dialog", "article"),
    [`${prefix}close`]: compiler("dialog", "close"),
    [`${prefix}footer button`]: compiler("dialog", "submit"),
  };
  let nameArray: string[] = [];
  switch (modal) {
    case "successmodal":
    case "failedmodal":
      nameArray = [
        "contenttop",
        "article_content",
        "header",
        "modaltitle",
        "prizename",
        "awardmsg",
        "prizeimg",
        "memo",
        "contentbottom",
      ];
      break;
    case "addressmodal":
      nameArray = [
        "addressbox",
        "formbox",
        "header",
        "main",
        "player",
        "subtitle",
        "row",
        "label",
        "input",
        "textarea",
      ];

      break;
    case "records":
      nameArray = [
        "list",
        "list_item",
        "list_item_prizeimg_wrap",
        "list_item_prizeimg",
        "list_item_text",
        "list_item_prizename",
        "list_item_wintime",
        "list_item_saveaddress",
        "list_item_address",
      ];
      break;
    case "rules":
      nameArray = ["list", "list_item"];
      break;
    default:
      break;
  }
  nameArray.forEach((name: string) => modalStyle(name, publicModal));
  return publicModal;
};

const getParames = (id: string, style: any, type: keyof GameMap) => ({
  ...handlePublicModal(id, "successmodal", style),
  ...handlePublicModal(id, "failedmodal", style),
  ...handlePublicModal(id, "addressmodal", style),
  ...handlePublicModal(id, "records", style),
  ...handlePublicModal(id, "rules", style),
  ...games(id, style, type),
});

const headDom = document.head;

const useStyles = (id: string, style: any, type: keyof GameMap) => {
  const createStyleParames = useCallback(() => {
    return {
      [id]: getParames(id, style, type),
    };
  }, [id, style, type]);

  const setDom = useCallback(() => {
    let style = headDom.querySelector(`#${id}_style`);
    if (!style) {
      style = document.createElement("style");
      style.id = `${id}_style`;
      document.head.appendChild(style);
    }
    const data = jss.createStyleSheet<string>(createStyleParames());
    style.innerHTML = data.toString();
    document.body.className = data.classes[Object.keys(data.classes)[0]];
  }, [createStyleParames, id]);

  const removeDom = useCallback(() => {
    let style = headDom.querySelector(`#${id}_style`);
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
