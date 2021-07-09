import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Tag, Tabs, Button, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteTemplate, queryTag, queryTagParams, queryTemplate, queryTemplateParams } from '~/api';
import EmptyIcon from '../CreateProject/EmptyIcon';
import Searchbar from './Searchbar';
import s from './TemplateList.module.less';

interface Props {
    onSelectedTemplate: (id: string, type: 'create' | 'edit') => void;
}
const { TabPane } = Tabs;
const { confirm } = Modal;

const TemplateList: React.FC<Props> = ({ onSelectedTemplate }) => {
    const [templateList, setTemplateList] = useState<queryTemplateParams[]>([]);
    const [templateParams, setTemplateParams] = useState<queryTemplateParams>({
        isPublic: 1,
    });

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

    const renderTags = useCallback(
        (tag: string) => {
            const tagTsx = tag.split(',').filter(item=> Number(item)).map(el => <>{tags.map((one, index) => (Number(el) === one.id) ? <Tag>{one.name}</Tag> : null) }</>);
            console.log(tagTsx);
            return tagTsx
        },
        [tags],
    )

    /**
     * 获取列表
     * @param type
     */
    const getTemplateList = useCallback(
        (query: queryTemplateParams) => {
            const params = { ...query, ...templateParams };
            queryTemplate(params).then((res) => {
                setTemplateList(res);
            });
        },
        [templateParams]
    );

    useEffect(() => {
        getTemplateList(templateParams);
    }, [getTemplateList, templateParams]);

    const del = useCallback(
        (id) => {
            deleteTemplate(id).then(() => {
                getTemplateList(templateParams);
            });
        },
        [getTemplateList, templateParams]
    );

    const onChangeTab = useCallback(
        (key) => {
            setTemplateParams({ ...templateParams, isPublic: key });
            getTemplateList({ isPublic: key });
        },
        [getTemplateList, templateParams]
    );

    const onSearch = useCallback(
        (data) => {
            console.log(data);
            getTemplateList({ ...templateParams, ...data });
        },
        [getTemplateList, templateParams]
    );

    const onDelete = useCallback(
      (id) => () => {
        confirm({
          content: (
            <div>确定要删除当前模板？</div>
          ),
          okText: "确定",
          cancelText: "取消",
          onCancel: () => {},
          onOk: () => del(id),
        });
      },
      [del],
    )

    return (
        <>
            <Tabs className={s.tab} defaultActiveKey="1" onChange={onChangeTab}>
                <TabPane tab="公共模板" key="1"></TabPane>
                <TabPane tab="我的项目" key="0"></TabPane>
            </Tabs>
            <Searchbar onClick={onSearch} tags={tags} />
            <div className={s.container}>
                {templateList.map((item: any, index) => (
                    <Card
                        hoverable
                        className={s.card}
                        bodyStyle={{ padding: '10px' }}
                        key={`${item.id}${index}`}
                        cover={
                            <div
                                className={classNames(s.projectcove, s.projectcovetpl)}
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
                                    <div>{item.describe}</div>
                                    <div className={s.tag}>{renderTags(item.tag)}</div>
                                    <div className={s.buttonbar}>
                                        <Button
                                            size="small"
                                            icon={<CopyOutlined />}
                                            onClick={() => onSelectedTemplate(item.id, 'create')}
                                        >
                                            从模板创建
                                        </Button>&nbsp;
                                        <Button
                                            size="small"
                                            icon={<EditOutlined />}
                                            onClick={() => onSelectedTemplate(item.id, 'edit')}
                                        />&nbsp;
                                        <Button
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            onClick={onDelete(item.id)}
                                        />
                                    </div>
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
