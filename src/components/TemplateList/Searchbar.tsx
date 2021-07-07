import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Tooltip, Input, Select, Button } from "antd";
import React, { useCallback, useState } from "react";

const { Option } = Select;

interface queryParams {
    title?: string,
    terminal?: string,
}

interface Props {
  onClick: (query: queryParams) => void;
}

const Searchbar: React.FC<Props> = ({onClick}) => {
  const children: any[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value={i.toString(36) + i}>
        {i.toString(36) + i}
      </Option>
    );
  }

  const [query, setQuery] = useState<queryParams>({});

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      const params = {};
      Object.keys(query).forEach((key) => {
        if (query[key]?.length) params[key] = query[key];
      })
      onClick(params)
    },
    [onClick, query],
  )

  return (
    <>
      <Row gutter={[5, 24]}>
        <Col span={4}>
          <Tooltip title="请输入模板名称">
            <Input type="text" placeholder="模版名称" onChange={(e) => setQuery({...query, title: e.target.value})} />
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title="按终端类型查找">
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="终端类型"
              defaultValue={"pc"}
              onChange={(terminal) => setQuery({...query, terminal})}
            >
              <Option value="mobile">移动端</Option>
              <Option value="pc">PC端</Option>
            </Select>
          </Tooltip>
        </Col>
        <Col span={8}>
          <Tooltip title="按模板类型查找">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="模板类型"
              defaultValue={["a10", "c12"]}
              onChange={() => {}}
            >
              {children}
            </Select>
          </Tooltip>
        </Col>
        <Col span={2}>
          <Button type="default" icon={<SearchOutlined />} onClick={onSearch}>
            查找模板
          </Button>
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Searchbar;
