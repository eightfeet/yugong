import Tooltip from "antd/lib/tooltip";
import React from "react";

interface Props {}

const HtmlSuffix: React.FC<Props> = () => {
  return (
    <div>
      <Tooltip title="允许输入HTML">
        <span style={{color: '#aaa'}}>html</span>
      </Tooltip>
    </div>
  );
};

export default HtmlSuffix;
