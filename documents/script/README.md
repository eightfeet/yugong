## 语法与规则

### 运行时

运行时是app运行时的数据池,是一份全局数据,供运行环境任何可以引用的地方使用;

在页面面板右上角、设置面版右上角的、参数面板的左上角都能看到图标 ![图片](./runicon.png) 点击即可以打开运行时面板:

![图片](./runningtime.png)

运行时默认包含下面数据

+ search
  
  url上的search参数数据,比如页面url `http://xxx?prame1=1&prame2=2` 那么search的数据就如下

  ```json
    {
        "prame1": "1",
        "prame2": "2"
    }
  ```

+ windowSize
+ unit

### html语法标签

为了得到更为灵活的展现形式,在yugong中参数设置部分条目允许使用html标签;

**编辑条目末尾有`html`标示时说明当前条目支持`html`标签:** 

![图片](./html.png)

### {{}}取数规则

设置面板中`{{}}`用于在运行时中获取数据,当我们把故意设定的参数发布到运行时后,即可通过`{{}}`来获取运行时的数据;

比如`runningTimes`中有默认`window`的`width`值.

```javascript
    {
        "search": {...},
        "window": {
            "height": 736,
            "width": 414
        },
        "unit": {...}
    }
```

我们可以通过如下方式来获取:

![图片](./getdata.png)

> 这里要注意,`{{}}`的root数据之乡的是runningTimes,所以在写`屏幕宽度={{window.width}}`不用写成`{{runningTimes.window.width}}`,而且`{{}}`的取数规则也仅能取到runningTimes下的数据;如果需要取页面window的值可以通过洗面`js{{}}`来实现;

### js{{}}表达式规则 source.xxx