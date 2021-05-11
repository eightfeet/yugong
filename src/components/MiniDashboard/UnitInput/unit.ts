export interface UnitsResult {
    text: string;
    value: string;
}

export const units = [
    {
        text: 'px',
        value: 'px'
    },
    {
        text: 'rem',
        value: 'rem'
    },
    {
        text: 'vw',
        value: 'vw'
    },
    {
        text: 'vh',
        value: 'vh'
    }
]

const getUnits = (globalUnit: string):any[] => {
    return [
        {
            text: `全局(${globalUnit})`,
            value: '',
        },
        {
            text: 'px',
            value: 'px'
        },
        {
            text: 'rem',
            value: 'rem'
        },
        {
            text: 'em',
            value: 'em'
        },
        {
            text: 'vw',
            value: 'vw'
        },
        {
            text: 'vh',
            value: 'vh'
        },
        {
            text: '%',
            value: '%'
        },
        {
            text: '运行时',
            value: 'runningTime'
        },
        {
            text: '自定义',
            value: '-'
        }
    ]
}

export default getUnits;
