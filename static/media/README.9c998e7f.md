## Button 按钮
- 设置按钮
    - **按钮文字** 设置按钮的显示文案
    - **禁用按钮** 这是一个布尔条件，A 条件 B，当满足条件时按钮被禁用，可以使用**运行时**(runningTimes)数据做为比对条件；<br />
    例如: 当窗口宽度大于100像素时禁用按钮点击事件
    ```typescript
        // 条件A 从运行时（runningTimes）获取当前的窗口尺寸
        {{windowSize.WW}}
        // 条件选择大于，条件B 设为100
        100
    ```
    - **隐藏按钮** 与禁用按钮一样也是一个布尔条件，A 条件 B，当满足条件时按钮被隐藏；<br /><br />

- 设置按钮初始样式
    - **初始显示状态** 按钮的初始显**样式**，<br />disabled(禁用), focus: (获取焦点), active: (激活), hover: (经过)
    