type Item = { name: string; width: number; height: number };

export const size: Item[] = [
  {name: "小型设备", width: 320, height: 640},
  {name: "中型设备", width: 390, height: 844},
  {name: "大型设备", width: 414, height: 896},
  {name: "平板", width: 768, height: 1024},
  {name: "笔记本电脑", width: 1024, height: 768},
]

export const getSize = (min?: number, max?: number) => {
  console.log(min, max);
  let newSize:Item[] = [...size];
  if (min) {
    newSize = size.filter(item => item.width > min);
    newSize = [{ name: '最小宽度', width: min, height: (window.innerHeight - 140)}].concat(newSize);
  }

  if (max) {
    newSize = newSize.filter(item => item.width < max);
    newSize = newSize.concat([{ name: '最大宽度', width: max, height: (window.innerHeight - 140)}])
  }
  return newSize
}