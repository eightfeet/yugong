const sleep = async (time: number) => new Promise(res => setTimeout(() => {
  res(undefined)
}, time || 1000));

export default sleep;