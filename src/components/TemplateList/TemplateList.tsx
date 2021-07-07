import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Tag, Tabs, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteTemplate, queryTemplate, queryTemplateParams } from '~/api';
import EmptyIcon from '../CreateProject/EmptyIcon';
import Searchbar from './Searchbar';
import s from './TemplateList.module.less';

interface Props {
    onSelectedTemplate: (id: string, type: 'create' | 'edit') => void;
}
const { TabPane } = Tabs;

const TemplateList: React.FC<Props> = ({ onSelectedTemplate }) => {
    const [templateList, setTemplateList] = useState<queryTemplateParams[]>([]);
    const [templateParams, setTemplateParams] = useState<queryTemplateParams>({
        isPublic: '1',
    });
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
        (id) => () => {
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

    return (
        <>
            <Tabs className={s.tab} defaultActiveKey="1" onChange={onChangeTab}>
                <TabPane tab="公共模板" key="1"></TabPane>
                <TabPane tab="我的项目" key="0"></TabPane>
            </Tabs>
            <Searchbar onClick={onSearch} />
            <div className={s.container}>
                {templateList.map((item: any, index) => (
                    <Card
                        hoverable
                        className={s.card}
                        bodyStyle={{ padding: '10px' }}
                        key={`${item.id}${index}`}
                        cover={
                            <div
                                className={s.projectcove}
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
                                            onClick={del(item.id)}
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
