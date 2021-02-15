import { backgroundGradient } from "~/compiler/compiler";
export const dataToStyleObject = ({
  valuse,
  colors,
  gradientDirections,
}: {
  /** 颜色位置值 */
  valuse: number[];
  /** 颜色值 */
  colors: string[];
  /** 渐变方向 */
  gradientDirections: string;
}) => {
  if (
    !Array.isArray(valuse) ||
    valuse.length === 0 ||
    !Array.isArray(colors) ||
    colors.length === 0 ||
    !gradientDirections
  )
    return {
        result: {},
        gradient: null
    };

  const gradient: any = {
    gradient: [],
    gradientDirections,
  };

  valuse.forEach((item, i) => {
    const temp = {
      color: colors[i],
      transition: item,
    };
    gradient.gradient.push(temp);
  });

  const { result } = backgroundGradient(gradient);
  return {result, gradient};
};
