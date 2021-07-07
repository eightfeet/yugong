import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Tooltip, Input, Select, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { queryTag, queryTagParams } from "~/api";

const { Option } = Select;

interface queryParams {
    title?: string,
    terminal?: string,
    tag?: number[]
}

interface Props {
  onClick: (query: queryParams) => void;
}

const Searchbar: React.FC<Props> = ({onClick}) => {

  const [query, setQuery] = useState<queryParams>({});
  const [tags, setTags] = useState<queryTagParams[]>([]);

  const getTags = useCallback(
    async () => {
      const tagsResult = await queryTag();
      setTags(tagsResult)
    },
    [],
  )

  useEffect(() => {
    getTags()
  }, [getTags])

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      const params = {};
      Object.keys(query).forEach((key) => {
        if (query[key]?.length) params[key] = key === 'tag' ? query[key]?.join(',') : query[key];
      })
      onClick(params)
    },
    [onClick, query],
  )

  const onChangTag = useCallback(
    (value) => {
      setQuery({...query, tag: value})
    },
    [query],
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
              value={query.terminal}
              onChange={(terminal) => setQuery({...query, terminal})}
            >
              <Option value="mobile">移动端</Option>
              <Option value="pc">PC端</Option>
            </Select>
          </Tooltip>
        </Col>
        <Col span={8}>
          <Tooltip title="按模板标签查找">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="标签"
              value={query.tag}
              onChange={onChangTag}
            >
              {tags.map(item => (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>))}
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
