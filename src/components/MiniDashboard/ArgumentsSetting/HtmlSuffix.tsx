import Tooltip from "antd/lib/tooltip";
import React from "react";

interface Props {
  info?: React.ReactNode
}

const HtmlSuffix: React.FC<Props> = ({info}) => {
  return (
    <div>
      <Tooltip title={<>允许输入HTML{info}</>}>
        <span style={{color: '#aaa'}}>html</span>
      </Tooltip>
    </div>
  );
};

export default HtmlSuffix;
