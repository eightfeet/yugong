import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import s from "./BorderCheckbox.module.less";
import {
  BorderBottomOutlined,
  BorderLeftOutlined,
  BorderOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
} from "@ant-design/icons";

interface Data {
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  border?: boolean;
}

interface Props {
  defaultData: Data;
  [keys: string]: any;
}

const BorderCheckbox: React.FC<Props> = ({
  unit,
  label,
  defaultData,
  onChange,
  ...other
}) => {
  const [borderPosition, setBorderPosition] = useState<Data>({
    borderTop: false,
    borderRight: false,
    borderBottom: false,
    borderLeft: false,
    border: false,
  });

  useEffect(() => {
    if (defaultData.border === true) {
      setBorderPosition({
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        border: true,
      });
    } else {
      setBorderPosition({ ...borderPosition, ...defaultData });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  const handleBorderPosition = useCallback(
    (
      prop:
        | "borderTop"
        | "borderRight"
        | "borderBottom"
        | "borderLeft"
        | "border"
    ) => {
      borderPosition[prop] = !borderPosition[prop];

      if (prop !== "border") {
        const {
          borderTop,
          borderRight,
          borderBottom,
          borderLeft,
        } = borderPosition;
        if (
          [borderTop, borderRight, borderBottom, borderLeft].includes(false)
        ) {
          borderPosition.border = false;
        } else {
          borderPosition.border = true;
          borderPosition.borderBottom = borderPosition.borderLeft = borderPosition.borderRight = borderPosition.borderTop = false;
        }
      } else {
        if (borderPosition.border === true) {
          borderPosition.borderBottom = borderPosition.borderLeft = borderPosition.borderRight = borderPosition.borderTop = false;
        }
      }
      const result = { ...borderPosition };
      if (onChange instanceof Function) {
        onChange(result);
      }
      setBorderPosition(result);
    },
    [borderPosition, onChange]
  );

  return (
    <Row className={s.row} gutter={4} {...other}>
      <Col span={24}>
        <div className={s.menu}>
          <div>
            <BorderOutlined
              onClick={() => handleBorderPosition("border")}
              className={borderPosition.border ? s.color : ""}
            />
          </div>
          <div>
            <BorderTopOutlined
              className={borderPosition.borderTop ? s.color : ""}
              onClick={() => handleBorderPosition("borderTop")}
            />
          </div>
          <div>
            <BorderRightOutlined
              className={borderPosition.borderRight ? s.color : ""}
              onClick={() => handleBorderPosition("borderRight")}
            />
          </div>
          <div>
            <BorderBottomOutlined
              className={borderPosition.borderBottom ? s.color : ""}
              onClick={() => handleBorderPosition("borderBottom")}
            />
          </div>
          <div>
            <BorderLeftOutlined
              className={borderPosition.borderLeft ? s.color : ""}
              onClick={() => handleBorderPosition("borderLeft")}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BorderCheckbox;
