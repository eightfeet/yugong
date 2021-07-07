import { Card, Tag, Tabs, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback, useEffect, useState } from "react";
import { deleteTemplate, queryTemplate, queryTemplateParams } from "~/api";
import EmptyIcon from "../CreateProject/EmptyIcon";
import Searchbar from "./Searchbar";
import s from "./TemplateList.module.less";

interface Props {
  onSelectedTemplate: (id: string) => void;
}
const { TabPane } = Tabs;

const TemplateList: React.FC<Props> = ({ onSelectedTemplate }) => {
  const [templateList, setTemplateList] = useState<queryTemplateParams[]>([]);
  const [templateParams, setTemplateParams] = useState<queryTemplateParams>({});
  /**
   * 获取列表
   * @param type
   */
  const getTemplateList = useCallback((query: queryTemplateParams) => {
    const params = {...query,...templateParams}
    queryTemplate(params).then((res) => {
      setTemplateList(res);
    });
  }, [templateParams]);

  useEffect(() => {
    getTemplateList({ isPublic: "1" });
  }, [getTemplateList]);

  const del = useCallback(
    (id, key) => () => {
      deleteTemplate(id).then((res) => {
        getTemplateList({ isPublic: key });
      });
    },
    [getTemplateList]
  );

  const onChangeTab = useCallback(
    (key) => {
      setTemplateParams({...templateParams, isPublic: key })
      getTemplateList({ isPublic: key });
    },
    [getTemplateList, templateParams]
  );

  const onSearch = useCallback(
    (data) => {
      console.log(data);
      getTemplateList({ isPublic: '1', ...data });
    },
    [getTemplateList],
  )

  return (
    <>
      <Tabs className={s.tab} defaultActiveKey="1" onChange={onChangeTab}>
        <TabPane tab="从模板创建" key="1"></TabPane>
        <TabPane tab="我的项目" key="0"></TabPane>
      </Tabs>
      <Searchbar onClick={onSearch} />
      <div className={s.container}>
        {templateList.map((item: any, index) => (
          <Card
            hoverable
            className={s.card}
            bodyStyle={{ padding: "10px" }}
            key={`${item.id}${index}`}
            cover={
              <div
                className={s.projectcove}
                onClick={() => onSelectedTemplate(item.id)}
              >
                {item.cove ? (
                  <img src={item.cove} alt={item.title} />
                ) : (
                  <EmptyIcon />
                )}
              </div>
            }
          >
            <Meta
              title={item.title}
              description={
                <>
                  <div>{item.tag}</div>
                  <Button onClick={del(item.id, "1")}>删除</Button>
                </>
              }
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default TemplateList;
