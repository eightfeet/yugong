## Form 
```typescript
  type ValueType = 
    valueType & 'adress'


```

```json
  [{"title":"来源","dataIndex":"title","formItemProps":{"rules":[{"required":true,"message":"此项为必填项"}]},"width":"100%"},{"title":"状态","dataIndex":"state","valueType":"cascader","valueEnum":{"all":{"text":"全部","status":"Default"},"open":{"text":"未解决","status":"Error"},"closed":{"text":"已解决","status":"Success","disabled":true},"processing":{"text":"解决中","status":"Processing"}},"width":"100%","tooltip":"当title为disabled时状态无法选择","dependencies":["title"]},{"title":"标签","dataIndex":"labels","width":"100%","tooltip":"当title为必填时此项将为必填","dependencies":["title"]},{"title":"创建时间","key":"showTime","dataIndex":"createName","valueType":"date"}]
```