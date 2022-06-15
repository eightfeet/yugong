import { SliderDataItem } from "./type";

export const mockData = () => {
  const data: SliderDataItem[] = [];
  for (let index = 0; index < 6; index++) {
    const last = ['P', 'a', 'r', 'a', 'l', 'l', 'a', 'x'];
    const element: SliderDataItem = {
      background: `rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`,
      childrens: index < 5 ? [{ content: `${index + 1}`}] : last.map((item, i) => ({
        content: item,
        parallax: {
          x: 800,
          y: 800,
          opacity: 0,
          duration: (i + 1) * 200,
          scale: 1
        }
      }))
    };
    data.push(element);
  }
  return data;
}
