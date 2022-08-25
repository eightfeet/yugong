
export const fliterValues = (oldValue: { [keys: string]: any }) => {
  const results: { [keys: string]: any } = {};
  for (const key in oldValue) {
    if (Object.prototype.hasOwnProperty.call(oldValue, key)) {
      const element = oldValue[key];
      if (element === undefined) continue;
      if (typeof element === "object" && element?.name === 'color') {
        const color = element?.value?.rgb ? Object.keys(element?.value?.rgb)?.map(key => element?.value?.rgb?.[key]) : [];
        results[key] = color.join(',') ? `rgba(${color.join(',')})` : undefined;
        continue;
      }
      
      if (typeof element === 'string' && (Number(element) || Number(element) === 0) ) {
        results[key] = Number(element) || undefined;
        continue;
      }
      results[key] = element;
    }
  }
  
  return results
}