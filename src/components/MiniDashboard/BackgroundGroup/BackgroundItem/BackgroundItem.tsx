import { Row, Col, Radio, RadioChangeEvent } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { BackgroundGradientTypesOfStyleItems } from '~/types/appData';
import Color from '../../Color';
import GradientSlider from '../../GradientSlider';
import UnitInput from '../../UnitInput';
import Upload from '../../Upload';
import Select from '~/components/MiniDashboard/Select';
import s from './BackgroundItem.module.less';
import QuadrangularSelect from '../../QuadrangularSelect';

interface Props {}

const Backgrounditem: React.FC<Props> = ({}) => {
    const [imageType, setImageType] = useState('image');

    // 渐变背景
    const [gradientData, setGradientData] =
        useState<BackgroundGradientTypesOfStyleItems>({});
    const { gradient, gradientDirections } = gradientData || {};

    const onChangeTab = useCallback((e: RadioChangeEvent) => {
        setImageType(e.target.value);
    }, []);

    const [imageUrl, setImageUrl] = useState<string>();
    const onChangeGradient = useCallback(() => {}, []);
    const onChangeBackground = useCallback(() => {}, []);
    /**
     * 渐变渲染
     * @returns
     */
    const renderGradient = () => (
        <GradientSlider
            onChange={onChangeGradient}
            defaultData={{ gradient, gradientDirections }}
        />
    );

    /**
     * 图片渲染
     * @returns
     */
    const renderImage = () => (
        <Row className={s.row} style={{marginBottom: '15px'}}>
            <Col span={12}>
                <Upload
                    label="背景图片"
                    onChange={onChangeBackground}
                    defaultImg={imageUrl}
                />
            </Col>
        </Row>
    );

    const [repeat, setRepeat] = useState();

    return (
        <>
            <Row className={s.row}>
                <Col span={12}>
                    <Color
                        label="背景颜色"
                        onChange={(data) => console.log(data)}
                        defaultColor={undefined}
                    />
                </Col>
            </Row>
            <Row className={s.row}>
                <Col span={24}>
                    <Radio.Group
                        defaultValue={imageType}
                        className={s.tab}
                        onChange={onChangeTab}
                    >
                        <Radio.Button value="image">图片背景</Radio.Button>
                        <Radio.Button value="gradient">渐变背景</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            {imageType === 'image' ? renderImage() : null}
            {imageType === 'gradient' ? renderGradient() : null}
            <Row className={s.row}>
                <Col span={12}>
                    <Select
                        label="平铺方式"
                        value={repeat}
                        optionsData={{
                            'no-repeat': '不平铺',
                            repeat: '平铺',
                            'repeat-x': '横向平铺',
                            'repeat-y': '纵向平铺',
                        }}
                        onChange={() => {}}
                    />
                </Col>
                <Col span={12}>
                    <UnitInput
                        label="背景高度"
                        min={0}
                        max={100000}
                        onChange={() => {}}
                        defaultValue={[100, '']}
                    />
                </Col>
            </Row>
            <Row className={s.row}>
                <Col span={12}>
                    <QuadrangularSelect
                        label="背景位置"
                        defaultData={[
                            [50, '%'],
                            [50, '%'],
                        ]}
                        onChange={(val) => console.log(val)}
                    />
                </Col>
                <Col span={12}>
                    <Row className={s.row}>
                        <Col span={24}>
                            <UnitInput
                                label="横向位置"
                                min={0}
                                max={100000}
                                onChange={(val) => console.log(val)}
                                defaultValue={[50, '']}
                            />
                        </Col>
                    </Row>
                    <Row className={s.row} key={2}>
                        <Col span={24}>
                            <UnitInput
                                label="纵向位置"
                                min={0}
                                max={100000}
                                onChange={(val) => console.log(val)}
                                defaultValue={[50, '']}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Backgrounditem;
