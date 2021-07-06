import { Card, Tag, Tabs, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback, useEffect, useState } from "react";
import request from "~/core/request";
import EmptyIcon from "../CreateProject/EmptyIcon";
import Searchbar from "./Searchbar";
import s from "./TemplateList.module.less";

interface Props {
  onSelectedTemplate: (id: string) => void,
}
const { TabPane } = Tabs;

const TemplateList: React.FC<Props> = ({onSelectedTemplate}) => {

  const [templateList, setTemplateList] = useState([]);

  const getTemplateList = useCallback(
    () => {
      request.get('/api/template?public=0').then(res => {
        setTemplateList(res)
      })      
    },
    [],
  )

  useEffect(() => {
    getTemplateList();
  }, [getTemplateList]);

  const del = useCallback(
    (id)=> () => {
      request.delete(`/api/template/${id}`).then(res => {
        getTemplateList()
      })  
    },
    [getTemplateList],
  )

  return (
    <Tabs className={s.tab} defaultActiveKey="1" onChange={() => console.log()}>
      <TabPane tab="从模板创建" key="1">
        <Searchbar />
        <div className={s.container}>
          {templateList.map((item: any, index) => (<React.Fragment key={index}>
            <Card
              hoverable
              className={s.card}
              bodyStyle={{padding: '10px'}}
              cover={
                <div className={s.projectcove} onClick={()=> onSelectedTemplate(item.id)}>
                  {item.cove ? <img src={item.cove} alt={item.title} /> : <EmptyIcon />}
                </div>
              }
            >
              <Meta title={item.title} description={<><div>{item.tag}</div><Button onClick={del(item.id)}>删除</Button></>} />
            </Card>
            </React.Fragment>
          ))}
          
        </div>
      </TabPane>
      <TabPane tab="我的项目" key="2">
        <Searchbar />
      </TabPane>
    </Tabs>
  );
};

export default TemplateList;
