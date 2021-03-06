import { Card, Tag, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import EmptyIcon from "../CreateProject/EmptyIcon";
import Searchbar from "./Searchbar";
import templates from "./template.json";
import s from "./TemplateList.module.less";

interface Props {
  onSelectedTemplate: (id: string) => void,
}
const { TabPane } = Tabs;

const Templatelist: React.FC<Props> = ({onSelectedTemplate}) => {
  return (
    <Tabs className={s.tab} defaultActiveKey="1" onChange={() => console.log()}>
      <TabPane tab="从模板创建" key="1">
        <Searchbar />
        <div className={s.container}>
          {templates.map((item, index) => (
            <Card
              key={index}
              onClick={()=> onSelectedTemplate(item.id)}
              hoverable
              className={s.card}
              bodyStyle={{padding: '10px'}}
              cover={
                <div className={s.projectcove}>
                  {item.cove ? <img src={item.cove} alt={item.title} /> : <EmptyIcon />}
                </div>
              }
            >
              <Meta title={item.title} description={item.tag.map((tag, tagInd) => <Tag key={tagInd}>{tag}</Tag>)} />
            </Card>
          ))}
        </div>
      </TabPane>
      <TabPane tab="我的项目" key="2">
        <Searchbar />
      </TabPane>
    </Tabs>
  );
};

export default Templatelist;
