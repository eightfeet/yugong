import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useCallback } from "react";
import { login, userResult } from "~/api";
import loading from "~/core/loading";

interface Props {
  labelCol?: number;
  wrapperCol?: number;
  onLogin?: (user: userResult) => void;
}

const Login: React.FC<Props> = ({ labelCol, wrapperCol, onLogin }) => {
  const onFinish = useCallback(
    (values: any) => {
      loading.show();
      login(values)
        .then(user => {
          loading.hide();
          if (onLogin instanceof Function) {
            onLogin(user)
          }
        }).catch(({ error }) => {
          loading.hide();
          message.error(error || '登录失败')
        });
    },
    [onLogin]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>登录</h2>
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
          rules={[{ required: true, message: "请输入用户名！" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: labelCol || 8, span: wrapperCol || 16 }}
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: labelCol || 8, span: wrapperCol || 16 }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
