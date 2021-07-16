import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Tag, Tabs, Button, Modal, Pagination } from "antd";
import Meta from "antd/lib/card/Meta";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteTemplate,
  queryTag,
  queryTagParams,
  queryTemplate,
  queryTemplateParams,
} from "~/api";
import { RootState } from "~/redux/store";
import EmptyIcon from "../CreateProject/EmptyIcon";
import clearEmptyOfObject from '~/core/helper/clearEmptyOfObject';
import Searchbar from "./Searchbar";
import s from "./TemplateList.module.less";

interface Props {
  onSelectedTemplate: (id: string, type: "create" | "edit") => void;
}
const { TabPane } = Tabs;
const { confirm } = Modal;

const TemplateList: React.FC<Props> = ({ onSelectedTemplate }) => {
  const { auth } = useSelector((state: RootState) => state.controller);
  const history = useHistory();
  const [templateList, setTemplateList] = useState<queryTemplateParams[]>([]);
  const [templateParams, setTemplateParams] = useState<queryTemplateParams>({
    isPublic: 1,
    limit: 2,
    offset: 0,
  });
  // 总条数决定页数
  const [total, setTotal] = useState<number>();
  // 当前页
  const [current, setCurrent] = useState(1)

  const [tags, setTags] = useState<queryTagParams[]>([]);

  const getTags = useCallback(async () => {
    const tagsResult = await queryTag();
    setTags(tagsResult);
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const renderTags = useCallback(
    (tag: string) => {
      const tagTsx = tag
        .split(",")
        .filter((item) => Number(item))
        .map((el, ind) => (
          <React.Fragment key={ind}>
            {tags.map((one, index) =>
              Number(el) === one.id ? <Tag key={index}>{one.name}</Tag> : null
            )}
          </React.Fragment>
        ));
      return tagTsx;
    },
    [tags]
  );

  /**
   * 获取列表
   * @param type
   */
  const getTemplateList = useCallback(
    async (query?: queryTemplateParams, force?: boolean) => {
      let params = {
        ...templateParams,
        ...query,
      };
      params = clearEmptyOfObject(params)
      if (force) {
        params = {...query}
      }
      if (params.isPublic === 0) {
        params.userId = auth?.session?.id
      }

      const { rows = [], limit, offset, count } = await queryTemplate(params);
          setTemplateList(rows);
          setTotal(Math.ceil(count / limit) * limit);
          setCurrent(offset / limit + 1);
    },
    [auth?.session?.id, templateParams]
  );

  useEffect(() => {
    getTemplateList({ isPublic: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const del = useCallback(
    (id) => {
      deleteTemplate(id).then(() => {
        getTemplateList();
      });
    },
    [getTemplateList]
  );

  const onChangeTab = useCallback(
    (key) => {
      // 拦截到登录
      if (key === "0" && !auth?.isLogin) {
        history.push("/login");
        return;
      }
      setTemplateParams({
        limit: templateParams.limit,
        offset: 0,
        isPublic: Number(key) as 1 | 0,
      });

      getTemplateList({
        limit: templateParams.limit,
        offset: 0,
        isPublic: Number(key) as 1 | 0,
      }, true)
    },
    [auth?.isLogin, getTemplateList, history, templateParams]
  );

  const onSearch = useCallback(
    (data) => {
      const optData = {...templateParams, ...data};
      if (!data.tag) {
        delete optData.tag;
      }
      if (!data.title) {
        delete optData.title;
      }
      if (!data.terminal) {
        delete optData.terminal;
      }
      setTemplateParams(optData)
      getTemplateList(optData, true);
    },
    [getTemplateList, templateParams]
  );

  const onDelete = useCallback(
    (id) => () => {
      confirm({
        content: <div>确定要删除当前模板？</div>,
        okText: "确定",
        cancelText: "取消",
        onCancel: () => {},
        onOk: () => del(id),
      });
    },
    [del]
  );

  const onChangePagination = useCallback(
    (page) => {
        const currentOffset = (page - 1)*(templateParams.limit || 0);
        
      getTemplateList({
          offset: currentOffset
      });
    },
    [getTemplateList, templateParams.limit]
  );

  return (
    <>
      <Tabs className={s.tab} defaultActiveKey="1" onChange={onChangeTab}>
        <TabPane tab="公共模板" key="1"></TabPane>
        <TabPane tab="我的项目" key="0"></TabPane>
      </Tabs>
      <Searchbar key={templateParams.isPublic} onClick={onSearch} tags={tags} />
      <div className={s.container}>
        {templateList.map((item: any, index) => (
          <Card
            hoverable
            className={s.card}
            bodyStyle={{ padding: "10px" }}
            key={`${item.id}${index}`}
            cover={
              <div className={classNames(s.projectcove, s.projectcovetpl)}>
                {item.cove ? (
                  <img src={item.cove} alt={item.title} />
                ) : (
                  <EmptyIcon />
                )}
              </div>
            }
          >
            <Meta
              title={
                <>
                  <h4 className={s.tpltitle}>{item.title}</h4>
                  <div className={s.tpldescript}>{item.describe}</div>
                </>
              }
              description={
                <>
                  <div className={s.tag}>{renderTags(item.tag)}</div>
                  <div className={s.buttonbar}>
                    <Button
                      size="small"
                      type="primary"
                      icon={<CopyOutlined />}
                      onClick={() => onSelectedTemplate(item.id, "create")}
                    >
                      从模板创建
                    </Button>
                    {auth?.session?.id === item.userId ? (
                      <>
                        &nbsp;
                        <Button
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => onSelectedTemplate(item.id, "edit")}
                        />
                        &nbsp;
                        <Button
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={onDelete(item.id)}
                        />
                      </>
                    ) : null}
                  </div>
                </>
              }
            />
          </Card>
        ))}
      </div>
      {!!total && (
        <Pagination
          current={current}
          pageSize={templateParams?.limit || 0}
          onChange={onChangePagination}
          total={total}
        />
      )}
    </>
  );
};

export default TemplateList;
