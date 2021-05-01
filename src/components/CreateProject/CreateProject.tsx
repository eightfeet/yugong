import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Row, Col, Card, PageHeader, Divider, Select, Button } from "antd";
import React from "react";
import CreateEditIcon from "./CreateEditIcon";
import s from "./CreateProject.module.less";

const { Meta } = Card;
const { Option } = Select;

interface Props {
  goBack: () => void;
}

const Createproject: React.FC<Props> = ({ goBack }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14];
  const children: any[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  return (
    <div>
      <PageHeader
        onBack={goBack}
        title="创建"
        subTitle="创建空白项目或从模板创建新项目"
      />
      <Row gutter={[24, 24]}>
        <Col span={5}>
          <Card
            hoverable
            style={{ width: "90%" }}
            cover={
              <div className={s.projectcove}>
                <CreateEditIcon />
              </div>
            }
          >
            <Meta className={s.mate} title="正在编辑" />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{ width: "90%" }}
            cover={
              <div className={s.projectcove}>
                <PlusOutlined className={s.addicon} />
              </div>
            }
          >
            <Meta className={s.mate} title="创建空白模板" />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        从模板创建
      </Divider>
      <Row gutter={[5, 24]}>
        <Col span={6}>
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="终端类型"
            defaultValue={["a10", "c12"]}
            onChange={() => {}}
          >
            <Option value="all">全部</Option>
          </Select>
        </Col>
        <Col span={6}>
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
        </Col>
        <Col span={6}>
        <Button type="default" icon={<SearchOutlined />}>
            查找模板
        </Button>
        </Col>
      </Row>
      <br />

      <Row gutter={[24, 24]}>
        {data.map((item) => (
          <Col key={item} span={5}>
            <Card
              hoverable
              style={{ width: "90%" }}
              cover={
                <div className={s.projectcove}>
                  <CreateEditIcon />
                </div>
              }
            >
              <Meta title="正在编辑" description="www.instagram.com" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Createproject;
