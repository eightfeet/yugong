import { Button, Form, Input, message } from "antd";
import React, { useCallback } from "react";
import { register, registerParams, userResult } from "~/api";

interface Props {
  labelCol?: number;
  wrapperCol?: number;
  onRegister?: (user: userResult) => void;
}

const Login: React.FC<Props> = ({ labelCol, wrapperCol, onRegister }) => {
  const onFinish = useCallback((values: registerParams) => {
    register(values).then((res) => {
        if (onRegister instanceof Function) {
            onRegister(res)
        }
        message.success("注册成功，请登录！")
    }).catch(({ error })=> {
        message.error(error);
    });
  }, [onRegister]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>注册</h2>
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
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码输入不相等"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: labelCol || 8, span: wrapperCol || 16 }}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
