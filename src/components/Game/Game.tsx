import {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import useGame from "./useGame";
import s from "./Game.module.scss";
import { GameProps, GameRef } from "./GameType";
import classNames from "classnames";
import React from "react";

export const gametypes = [
  "boxroulette",
  "roulette",
  "flipcard",
  "slotmachine",
  "treasurebox",
  "dice",
  "case",
  "redenvelope",
];

const Game = (
  {
    parentId,
    targetId,
    prizes,
    start,
    saveAddress,
    playerPhone,
    checkVerificationCode,
    receiverInfo,
    cardIdRequest,
    type = "case",
    onCancel,
    onEnsure,
    failedModalTitle,
    submitFailedText,
    successModalTitle,
    submitSuccessText,
    submitAddressText,
    successModalAnimation,
    onShowSuccess,
    onShowFailed,
    onShowAddress,
    className,
  }: GameProps,
  ref: Ref<any>
) => {
  const gameType = gametypes.includes(type) ? type : "case";
  const gameStart = useCallback(() => {
    if (!prizes?.length) {
      console.error("(props) 没有奖品 prizes: Prize[]");
      return Promise.reject();
    }
    if (!start) {
      console.error("(props) 没有抽奖方法 start: () => Promise<PrizeType>");
      return Promise.reject();
    }
    return start();
  }, [prizes?.length, start]);

  const gameSaveAddress = useCallback(
    (data) => {
      if (!saveAddress) {
        console.error(
          "(props) 没有保存地址方法 saveAddress: (data: Address) => Promise<void>"
        );
        return Promise.reject();
      } else {
        return saveAddress(data);
      }
    },
    [saveAddress]
  );

  const gameParames = useMemo(() => {
    const theme = require(`./theme/${gameType}`).default;
    return {
      targetId,
      parentId: parentId || "gameparentid",
      // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
      cardIdRequest: cardIdRequest || 1,
      style: theme,
      start: gameStart,
      saveAddress: gameSaveAddress,
      receiverInfo: receiverInfo || {},
      prizes: prizes || [],
      onCancel,
      loading: {
        size: 25,
        length: 5,
        cycle: 0.5,
      },
      onEnsure,
      onShowSuccess,
      onShowFailed,
      onShowAddress,
      failedModalTitle,
      submitFailedText,
      successModalTitle,
      submitSuccessText,
      submitAddressText,
      playerPhone,
      checkVerificationCode,
      SuccessModalAnimation: successModalAnimation,
    };
  }, [
    gameType,
    targetId,
    parentId,
    cardIdRequest,
    gameStart,
    gameSaveAddress,
    receiverInfo,
    prizes,
    onCancel,
    onEnsure,
    onShowSuccess,
    onShowFailed,
    onShowAddress,
    failedModalTitle,
    submitFailedText,
    successModalTitle,
    submitSuccessText,
    submitAddressText,
    playerPhone,
    checkVerificationCode,
    successModalAnimation,
  ]);

  const [game, node] = useGame(gameType, gameParames);

  useImperativeHandle(
    ref,
    () => ({
      game,
    }),
    [game]
  );

  return (
    <div
      id={parentId || "gameparentid"}
      ref={node as any}
      className={classNames(s.root, className)}
    />
  );
};

export default React.memo(
  forwardRef<GameRef, GameProps>(Game),
  // memo组件, 仅在必要时再更新组件
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
