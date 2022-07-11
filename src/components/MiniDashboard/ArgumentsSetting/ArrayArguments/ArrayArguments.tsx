import { Button, Col, Input, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ArgumentsItem } from '~/types/appData';
import s from './ArrayArguments.module.less';
import HtmlSuffix from '../HtmlSuffix';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
} from 'react-sortable-hoc';
import MoveIcon from './MoveIcon';
import classNames from 'classnames';
import arrayMove from 'array-move';
import { cloneDeep } from 'lodash';

const DragHandle = SortableHandle(() => (
    <span className={s.icon}>
        <MoveIcon />
    </span>
));

interface SortableItemProps {
    value: string | number | readonly string[] | undefined;
    htmlInput: boolean;
    index: number;
    onChange: (value: string | null | undefined) => void;
    onMinus: (index: number) => void;
    describe: string;
}

const SortableItem = SortableElement(
    ({
        value,
        htmlInput,
        index,
        onChange,
        onMinus,
        describe,
    }: SortableItemProps) => {
        return (
            <Row
                className={classNames(s.row, 'arrayarguments')}
                gutter={4}
                key={index}
            >
                <Col span={22}>
                    <DragHandle />
                    <Input
                        onChange={(e) => onChange(e.target.value)}
                        prefix={<div className={s.prefix}>{index}</div>}
                        suffix={htmlInput ? <HtmlSuffix /> : null}
                        placeholder={`请输入值${describe || ''}`}
                        type="text"
                        value={value}
                    />
                </Col>
                <Col span={2} className={s.btn}>
                    {true ? (
                        <Button
                            size="small"
                            onClick={() => onMinus(index)}
                            icon={<MinusOutlined />}
                        />
                    ) : null}
                </Col>
            </Row>
        );
    }
);

interface SortableContainerProps {
    data: any[];
    onChange: (index: number, value: string | null | undefined) => void;
    onMinus: (index: number) => void;
    htmlInput: boolean;
    describe: string;
}

const SortableList = SortableContainer(
    ({
        data,
        onChange,
        onMinus,
        htmlInput,
        describe,
    }: SortableContainerProps) => {
        return (
            <div>
                {data.map((item: any, index: number) => (
                    <SortableItem
                        key={index}
                        index={index}
                        value={item}
                        htmlInput={htmlInput}
                        onChange={(value) => onChange(index, value)}
                        onMinus={() => onMinus(index)}
                        describe={describe}
                    />
                ))}
            </div>
        );
    }
);

interface Props {
    typeArguments: ArgumentsItem;
    htmlInput?: boolean;
    flexible: boolean;
    describe?: string;
    onChange: (data: ArgumentsItem) => void;
}

interface anyObj {
    [keys: string]: any;
}

const ArrayArguments: React.FC<Props> = ({
    typeArguments,
    flexible,
    onChange,
    htmlInput,
    describe,
}) => {
    const [argumentsState, setArgumentsState] = useState<ArgumentsItem>();
    useEffect(() => {
        setArgumentsState(typeArguments);
    }, [typeArguments]);

    const onChangeValue = useCallback(
        (index: number, value: any) => {
            const result = cloneDeep(argumentsState) as anyObj;
            result.data[index] = value;
            
            if (onChange instanceof Function) {
                onChange(result as ArgumentsItem);
            }
            setArgumentsState(result as ArgumentsItem);
        },
        [argumentsState, onChange]
    );

    const onAddKey = useCallback(() => {
        const result: anyObj = { ...argumentsState };
        if (!Array.isArray(result.data)) {
            result.data = [];
        }

        result.data.push(undefined);

        if (onChange instanceof Function) {
            onChange(result as ArgumentsItem);
        }
        setArgumentsState(result as ArgumentsItem);
    }, [argumentsState, onChange]);

    const onMinus = useCallback(
        (index: number) => {
            const result: anyObj = { ...argumentsState };
            result.data = result.data.filter(
                (_: any, ind: number) => ind !== index
            );
            if (onChange instanceof Function) {
                onChange(result as ArgumentsItem);
            }
            setArgumentsState(result as ArgumentsItem);
        },
        [argumentsState, onChange]
    );

    const onSort = useCallback(
        ({ oldIndex, newIndex }) => {
            const result: anyObj = cloneDeep(argumentsState || []);
            result.data = arrayMove(result.data, oldIndex, newIndex);
            if (onChange instanceof Function) {
                onChange(result as ArgumentsItem);
            }
            setArgumentsState(result as ArgumentsItem);
        },
        [argumentsState, onChange]
    );

    const data: any = argumentsState?.data || [];
    return (
        <>
            {true ? (
                <Row className={s.toolbar} gutter={4}>
                    <Col span={4}>
                        <Button onClick={onAddKey} icon={<PlusOutlined />}>
                            增加
                        </Button>
                    </Col>
                </Row>
            ) : null}
            <SortableList
                onSortEnd={onSort}
                describe={describe || ''}
                useDragHandle
                data={data}
                htmlInput={!!htmlInput}
                onChange={onChangeValue}
                onMinus={onMinus}
            />
        </>
    );
};

export default ArrayArguments;
