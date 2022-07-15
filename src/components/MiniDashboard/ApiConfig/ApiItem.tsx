import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import {
  Select,
  Row,
  Col,
  Input,
  Divider,
  Tooltip,
  Button,
  InputRef,
  Form,
} from 'antd';
import classNames from 'classnames';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import { Api } from '~/types/appData';
import MoveIcon from './MoveIcon';
import s from './ApiConfig.module.less';
import ApiDataMap from './ApiDataMap';
import { useCallback, useRef, useState } from 'react';
import sleep from '~/core/helper/sleep';
import { useForm } from 'antd/lib/form/Form';

const selectSetting = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: '100px' }}
    placeholder="请选择"
  >
    <Select.Option value="mode">mode</Select.Option>
    <Select.Option value="headers">headers</Select.Option>
    <Select.Option value="credentials">credentials</Select.Option>
  </Select>
);

const methodArray = ['GET', 'POST', 'PUT', 'DELETE'];
const selectMethod = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: '90px' }}
    placeholder="请选择"
  >
    {methodArray.map((item) => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ))}
  </Select>
);

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const ApiItem = SortableElement(
  ({
    currentIndex,
    element,
    apiData,
    onRemove,
    onChangeUrl,
    onChangeMethod,
    onChangeSetting,
    onHandleUserArg,
    onchangeDatamap,
    onchangeEntermap,
    onChangeName,
    sortable,
  }: {
    currentIndex: number;
    element: any;
    apiData?: Api[];
    onRemove?: (index: number, data: Api) => void;
    onChangeUrl: (index: number) => any;
    onChangeMethod: (index: number) => any;
    onChangeSetting: (index: number) => any;
    onHandleUserArg: (
      index: number,
      type: 'body' | 'successPublic' | 'errorPublic',
    ) => void;
    sortable?: boolean;
    onchangeDatamap: (data: Api['dataMap']) => void;
    onchangeEntermap: (data: Api['enterMap']) => void;
    onChangeName?: (index: number, value: string) => void;
  }) => {
    const inputRef = useRef<InputRef>(null);
    const [form] = useForm();

    const item = {
      ...(apiData?.length ? apiData[currentIndex] : {}),
      ...element,
    };

    const [isEdit, setIsEdit] = useState(false);
    const validatorName = useCallback(
      (_: any, value: any) => {
        if (/[^a-zA-Z0-9]/.test(value)) {
          return Promise.reject(new Error('请输入字母或数字'));
        }
        const theSame = apiData?.some((item, index) => index !== currentIndex && value && item.name === value);
        if (theSame) {
          return Promise.reject(new Error(`Api名称${value}已存在`));
        }
        return Promise.resolve();
      },
      [apiData, currentIndex],
    );

    const handleChangeName = useCallback(() => {
      if (onChangeName instanceof Function) {
        const error = form.getFieldError('name');
        const value = form.getFieldValue('name');
        if (!error?.length) {
          setIsEdit(false);
          onChangeName(currentIndex, value);
        }
      }
    }, [currentIndex, form, onChangeName]);

    const onEditName = useCallback(async () => {
      setIsEdit(true);
      await sleep(100);
      inputRef.current?.focus({ cursor: 'end' });
    }, []);

    const hanleEnter = useCallback(
      (e) => {
        if (e.key === "Enter") {
          handleChangeName()
        }
      },
      [handleChangeName],
    )
    

    return (
      <div className={classNames(s.item, 'apiitem')} key={item.apiId}>
        {sortable ? <DragHandle /> : null}
        <div className={s.divide}>
          <div className={s.title}>
            {!isEdit ? (
              <div>
                {item.name || '请定义api名称'}
                {onRemove instanceof Function ? (
                  <EditOutlined onClick={onEditName} />
                ) : null}
              </div>
            ) : null}
            {isEdit ? (
              <Row className={s.row}>
                <Col span={24}>
                  <Form form={form} onBlur={handleChangeName} onKeyDown={hanleEnter}>
                    <Form.Item
                      initialValue={item.name}
                      required
                      label="Api名称"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: '请输入Api名称',
                        },
                        {
                          validator: validatorName,
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        ref={inputRef}
                        type="text"
                        size="small"
                        allowClear
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : null}
          </div>

          {onRemove instanceof Function && !isEdit ? (
            <Button
              size="small"
              icon={
                <MinusOutlined
                  onClick={() => onRemove(currentIndex, element)}
                />
              }
            />
          ) : null}
        </div>
        {item.name ? <>
          <Row className={s.row} gutter={4}>
            <Col span={24}>
              <Input
                onChange={onChangeUrl(currentIndex)}
                addonBefore={selectMethod(
                  onChangeMethod(currentIndex),
                  item.method,
                )}
                addonAfter={selectSetting(
                  onChangeSetting(currentIndex),
                  '高级设置',
                )}
                value={item.url}
                placeholder="请输入Url 接口地址"
                allowClear
              />
            </Col>
          </Row>
          {item.hideBodyInput ? (
            <div>
              <ApiDataMap
                title="入参转换/映射"
                onChange={onchangeEntermap}
                description={item.enterDescription}
                dataMap={item?.enterMap}
                overwrite={true}
              />
            </div>
          ) : (
            <Row className={s.row} gutter={4}>
              <Col span={24}>
                <Button
                  onClick={() => onHandleUserArg(currentIndex, 'body')}
                  className={s.w100}
                >
                  入参设置
                </Button>
              </Col>
            </Row>
          )}
          <ApiDataMap
            title="结果转换/映射"
            onChange={onchangeDatamap}
            description={item.description}
            dataMap={item?.dataMap}
          />
          <Divider orientation="left" plain>
            将结果发布到全局
          </Divider>
          <Row gutter={4}>
            <Col span={12}>
              <Tooltip title={<div>将Api请求成功结果发布到全局</div>}>
                <Button
                  onClick={() => onHandleUserArg(currentIndex, 'successPublic')}
                  className={s.w100}
                >
                  success
                </Button>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title={<div>将Api请求失败结果发布到全局</div>}>
                <Button
                  onClick={() => onHandleUserArg(currentIndex, 'errorPublic')}
                  className={s.w100}
                >
                  error
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </>: null}
      </div>
    );
  },
);

export default ApiItem;
