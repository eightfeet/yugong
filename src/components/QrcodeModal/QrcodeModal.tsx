import { Modal, ModalProps } from 'antd';
import React, { useEffect, useRef } from 'react';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

import s from './QrcodeModal.module.scss';
import classNames from 'classnames';

interface Props {
  sourceData: string,
  options?: QRCodeToDataURLOptions,
  canvasClass?: string,
  info?: React.ReactNode,
}

const QrcodeModal:React.FC<Props & ModalProps> = ({sourceData,options={}, canvasClass,info,...other}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    canvasRef.current && QRCode.toDataURL(canvasRef.current, sourceData, options)
  }, [options, sourceData])

  return (
    <Modal {...other} footer={null}>
      <div className={s.root}>
        <div className={s.canvaswrap}>
          <canvas className={classNames(s.canvas, canvasClass)} ref={canvasRef} />
        </div>
        {info ? <div>{info}</div> : null}
      </div>
    </Modal>
  )
}

export default QrcodeModal;