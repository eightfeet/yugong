function findPath(value: string, data: any[]) {
    const sel: any[] = [];
    function loop(selected: string, children: any[]) {
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        if (selected === item.value) {
          sel.push(item);
          return;
        }
        if (item.children) {
          loop(selected, item.children);
          if (sel.length) {
            sel.push(item);
            return;
          }
        }
      }
    }
    loop(value, data);
    return sel;
  }

  export default findPath;