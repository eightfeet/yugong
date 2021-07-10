import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

interface Props {
    labelCol?: number;
    wrapperCol?: number;
}

const Login:React.FC<Props> = ({labelCol, wrapperCol}) => {
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
        <>
        <h2 style={{textAlign: 'center', marginBottom: '20px'}}>登录</h2>
      <Form
        name="basic"
        labelCol={{ span: labelCol || 8 }}
        wrapperCol={{ span: wrapperCol || 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: labelCol || 8, span: wrapperCol || 16 }}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: labelCol || 8, span: wrapperCol || 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </>
    );
  }

export default Login