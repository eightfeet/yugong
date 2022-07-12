import { Prize } from '@byhealth/lottery/dist/types/core';
import { GameMap } from '~/components/Game/useGame';
import { toStyle } from '~/core/helper/toStyles';

/*
 *配合jss设置class
 */
export const setClass = (targetId: string, userClass: string) => {
  const rootDom = document.getElementById(targetId);
  if (rootDom) {
    rootDom.className = userClass;
  }
};

/**
 * 是否图片
 * @param str string
 * @returns boolean
 */
export const isImg = (str: string) => {
  console.log(typeof str, str);
  if (typeof str !== 'string') return false;
  return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(str?.toLocaleLowerCase());
};

/**
 * 从奖品组中获取目标奖品
 * @param id 目标id
 * @param prizes 当前奖品组
 * @returns 操作奖品
 */
export const getPrizeById = (
  id: string | number,
  prizes: Prize[],
): Prize | undefined => {
  let currentPrize: Prize | undefined = undefined;
  prizes.some((prize) => {
    if (prize.prizeId === id) {
      currentPrize = prize;
      return true;
    }
    return false;
  });
  return currentPrize;
};

/**创建游戏样式 */
export const buildGamesStyle = (MID: string, style: any, type: keyof GameMap) => {
  const prefix = `& .${MID}_`;

  const compiler = (name: string) => toStyle(style[`${type}_${name}`], true);
  const buildStyle = (name: string, style: { [keys: string]: any }) => {
    style[`${prefix}${name}`] = compiler(name);
  };

  const groupStyle = {};

  let nameArray: string[] = [];
  switch (type) {
    case 'boxroulette':
      nameArray = [
        'root',
        'items_wrap',
        'items_lottery',
        'items_prizeItem_wrap',
        'items_prizeItem',
        'items_selected_wrap',
        'items_selected',
        'prize',
        'items_gameimg',
        'items_prizealias',
        'items_lotterybuttonwrap',
        'items_lotterybutton',
      ];
      break;
    case 'roulette':
      nameArray = [
        'root',
        'wrap',
        'lottery',
        'wheel',
        'award',
        'prizealias',
        'gameImg',
        'divide',
        'needle',
        'lotterybutton',
      ];
      break;
    case 'flipcard':
      nameArray = [
        'root',
        'wrap',
        'item',
        'front',
        'back',
        'prizeImg',
        'prizeAlias',
      ];
      break;
    case 'redenvelope':
      nameArray = [
        'root',
        'wrap',
        'redpack',
        'redpackopen',
        'topcontent',
        'info',
        'subtitle',
        'title',
        'result',
        'gameprizename',
        'gameawardmsg',
        'actionbox',
        'startbutton',
        'resultcontent',
        'gameprize',
        'memo',
      ];
      break;
    case 'dice':
      nameArray = ['root', 'wrap', 'dice', 'side', 'dot'];
      break;
    case 'slotmachine':
      nameArray = [
        'root',
        'wrap',
        'game',
        'gamewrap',
        'gameitem_wrap',
        'gameitem',
        'gameimg',
        'prizealias',
        'startbtn',
      ];
      break;
    case 'case':
      nameArray = ['button'];
      break;

    default:
      break;
  }
  nameArray.forEach((name: string) => buildStyle(name, groupStyle));
  return groupStyle;
};

/**创建弹窗样式 */
export const buildPublicModalStyle = (MID: string, modal: string, style: any) => {
  const prefix = `& .${MID}_${modal}_wrap .${MID}_${modal}_`;
  const compiler = (block: string, name: string) => toStyle(style[`${block}_${name}`], true);
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
        "footer",
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
        "footer",
      ];

      break;
    case "records":
      nameArray = [
        "content",
        "header",
        "list",
        "list_item",
        "list_item_prizeimg_wrap",
        "list_item_prizeimg",
        "list_item_text",
        "list_item_prizename",
        "list_item_wintime",
        "list_item_saveaddress",
        "list_item_address",
        "footer",
      ];
      break;
    case "rules":
      nameArray = ["content", "header", "list", "list_item", "footer"];
      break;
    default:
      break;
  }
  nameArray.forEach((name: string) => modalStyle(name, publicModal));
  return publicModal;
};

/**创建组件样式  */
export const buildModuleStyles = (id: string, style: any, type: keyof GameMap) => ({[id]: {
  [`& .${id.split('_')[0]}_gameroot`]: toStyle(style.gameroot, true),
  ...buildPublicModalStyle(id, "successmodal", style),
  ...buildPublicModalStyle(id, "failedmodal", style),
  ...buildPublicModalStyle(id, "addressmodal", style),
  ...buildPublicModalStyle(id, "records", style),
  ...buildPublicModalStyle(id, "rules", style),
  ...buildGamesStyle(id, style, type),
}});
