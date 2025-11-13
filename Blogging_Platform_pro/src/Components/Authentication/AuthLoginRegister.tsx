import { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useMediaQuery } from "react-responsive";
import "antd/dist/reset.css";
import Bloglog from "../../assets/Bloglog.png";

const { Title, Text } = Typography;

export default function AuthLoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const onFinish = (values: any) => {
    console.log("Form Submitted:", values);
    message.success(isLogin ? "Login successful!" : "Account created!");
  };

  return (
    <div
      className={`flex min-h-screen bg-white ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      {/* LEFT SIDE IMAGE (hidden on mobile) */}
      {!isMobile && (
  <div
    className="flex flex-1 items-center justify-center h-screen border-r border-white bg-white"
  >
    <img
      src={Bloglog}
      alt="Blog Platform"
      className="max-w-[80%] max-h-[80%] object-contain"
    />
  </div>
)}


      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex items-center justify-center p-10 ">
        <Card className="w-full max-w-md " >
        
          <div className="text-center mb-6 ">
            <Title level={3} className="!mb-2">
              {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
            </Title>
            <Text type="secondary">
              {isLogin
                ? "Login to your blogging platform account"
                : "Join and start sharing your thoughts"}
            </Text>
          </div>

          <Form
            name="auth-form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {!isLogin && (
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="John Doe" size="large" />
              </Form.Item>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="example@mail.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="rounded-lg"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form.Item>

            <div className="text-center">
              <Text type="secondary">
                {isLogin ? "Don't have an account? " : "Already a member? "}
              </Text>
              <Button
                type="link"
                onClick={() => setIsLogin(!isLogin)}
                className="p-0"
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </div>
          </Form>
          
        </Card>
      </div>
    </div>
  );
}
