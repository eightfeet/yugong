/**
 * @param textarea 文本框
 * @param password 密码框
 * @param money 金额 option 操作 需要返回一个数组
 * @param date 日期 YYYY-MM-DD
 * @param dateWeek 周选择器
 * @param dateMonth 月选择器
 * @param dateQuarter 季度选择器
 * @param dateYear 年选择器
 * @param dateRange 日期范围 YYYY-MM-DD[]
 * @param dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * @param dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * @param time: 时间 HH:mm:ss
 * @param timeRange: 时间区间 HH:mm:ss[]
 * @param index：序列
 * @param indexBorder：序列
 * @param progress: 进度条
 * @param percent: 百分比
 * @param digit 数值
 * @param second 秒速
 * @param fromNow 相对于当前时间
 * @param avatar 头像
 * @param code 代码块
 * @param image 图片设置
 * @param jsonCode Json 的代码块，格式化了一下
 * @param color 颜色选择器
 * @param color 颜色选择器
 */



export const dataType = {
  number: '数字',
  string: '字符',
  date: '日期',
  image: '图片',
}

export type DataType<T = undefined> = keyof T & 'number' | 'string' | 'date' | 'image';

export const dataTypeFormat = {
  number: {
    0: '整数',
    1: '保留1位小数',
    2: '保留2位小数',
  },
  date: {
    'YYYY': 'YYYY',
    'YYYY-MM-DD HH:mm:ss': 'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD': 'YYYY-MM-DD',
    'MM-DD': 'MM-DD',
    'HH:mm:ss': 'HH:mm:ss'
  }
}