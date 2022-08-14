
export const fliterValues = (oldValue: { [keys: string]: any }) => {
  const results: { [keys: string]: any } = {};
  for (const key in oldValue) {
    if (Object.prototype.hasOwnProperty.call(oldValue, key)) {
      const element = oldValue[key];
      if (element === undefined) continue;
      if (typeof element === "object" && element?.name === 'color') {
        const color = Object.keys(element?.value?.rgb).map(key => element?.value?.rgb[key]);
        if (color.length) {
          results[key] = `rgba(${color.join(',')})`;
        }
        continue;
      }
      results[key] = Number(element) || element;
    }
  }
  return results
}