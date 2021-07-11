import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { queryTag, queryTagParams } from '~/api';
import isType from '~/core/helper/isType';
import { AnyObject } from 'yup/lib/types';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

export interface TemplateInfo {
    /**模板id */
    id?: number;
    /**名称 */
    title?: string;
    /**标签 */
    tag?: string[];
    /**终端 */
    terminal?: string;
    /**封面 */
    cove?: any[];
    /**描述 */
    describe?: string;
    /**0不公开，1公开 */
    isPublic?: boolean;
}

interface Props {
    visible: boolean;
    onOk: (template: TemplateInfo) => void;
    onCancel: () => void;
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const TemplateInfoModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
    const [tags, setTags] = useState<queryTagParams[]>([]);
    const pageData = useSelector((state: RootState) => state.pageData);
    const [defaultValue, setDefaultValue] = useState<AnyObject>();

    const getTags = useCallback(async () => {
        const tagsResult = await queryTag();
        setTags(tagsResult);
    }, []);

    useEffect(() => {
        const { template = {}, pageTitle } = pageData;
        const { title, cove, tag, describe, terminal } = template;
        const defaultParams: TemplateInfo = {
            title: title || pageTitle,
            cove: !!cove ? [{thumbUrl: cove}] : [],
            tag: !!tag ? tag.split(',') : [],
            isPublic: false,
            describe,
            terminal,
        };
        setDefaultValue(defaultParams);
    }, [pageData]);

    useEffect(() => {
        getTags();
    }, [getTags]);

    const handleSubmit = useCallback(
        (data: AnyObject) => {
            if (!isType(data, 'Object')) return;
            data.describe = data.describe || '';
            if (onOk instanceof Function) onOk(data);
        },
        [onOk]
    );

    return (
        <Modal
            title="模版信息"
            visible={visible}
            onCancel={onCancel}
            okText={'确定'}
            cancelText={'取消'}
            footer={null}
        >
            <Form
                name="templateInfo"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                initialValues={defaultValue}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="模板标题"
                    name="title"
                    rules={[{ required: true, message: '请填写模板标题' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="终端"
                    name="terminal"
                    rules={[{ required: true, message: '请选择终端' }]}
                >
                    <Select placeholder="请选择">
                        <Select.Option value="mobile">移动端</Select.Option>
                        <Select.Option value="pc">PC端</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="cove"
                    label="封面图片"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="模版封面图片"
                    rules={[{ required: true, message: '请上传封面图片' }]}
                >
                    <Upload
                        action="https://wx-test1.by-health.com/commonservice/api/upload"
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>上传图片</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="描述" name="describe">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    label="标签"
                    name="tag"
                    rules={[{ required: true, message: '请选择标签' }]}
                >
                    <Select mode="multiple" allowClear placeholder="标签">
                        {tags.map((item) => (
                            <Select.Option key={item.id} value={`${item.id}`}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="isPublic"
                    valuePropName="checked"
                    wrapperCol={{ offset: 9, span: 17 }}
                >
                    <Checkbox>发布为公共模板</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TemplateInfoModal;
