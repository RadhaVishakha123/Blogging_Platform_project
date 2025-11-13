import { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useMediaQuery } from "react-responsive";
import "antd/dist/reset.css";
import useAuth from "../Context/AuthContext";
import Bloglog from "../../assets/Bloglog.png";

const { Title, Text } = Typography;

export default function AuthLoginRegister() {
  const { AddUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
const [form]=Form.useForm();//Create a form instance
  const onFinish = (values: any) => {
    console.log("Form Submitted:", values);
    
    if (isLogin) {

    } 
    else {
      const { cPassword, ...rest } = values;
      const found:boolean=AddUser(rest);
      if(!found)return;
      else{
      form.resetFields();

      setIsLogin(true);
      }
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        isMobile
          ? "flex-col bg-black text-white"
          : "flex-row items-center justify-center bg-black text-white"
      }`}
    >
      {/* LEFT SIDE IMAGE (hidden on mobile) */}
      {!isMobile && (
        <div className="flex items-center justify-center h-[80vh] mr-16">
          <img
            src={Bloglog}
            alt="Blog Platform"
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </div>
      )}

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center px-10 py-12">
        <Card
          variant="borderless"
          className="w-full max-w-md !bg-transparent !shadow-none !border-none !text-white"
          style={{
            color: "white",
          }}
        >
          <div className="text-center mb-8">
            {/* Logo Name */}
            <h2
              className="text-4xl font-extrabold text-white tracking-wide mb-2"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              ShareMind
            </h2>

            {/* Form Header */}
            <Title level={3} className="!mb-2 !text-white">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </Title>

            {/* Subtext */}
            <Text className="!text-gray-300">
              {isLogin
                ? "Login to your ShareMind account"
                : "Join ShareMind and start sharing your thoughts"}
            </Text>
          </div>

          <Form
            name="auth-form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="on"
          >
            {!isLogin && (
              <Form.Item
                label={<span className="text-white">Full Name</span>}
                name="Username"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="John Doe" size="large" />
              </Form.Item>
            )}

            <Form.Item
              label={<span className="text-white">Email</span>}
              name="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input placeholder="example@mail.com" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Password</span>}
              name="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>
            {!isLogin && (
              <Form.Item
                label={<span className="text-white">Comfirm Password</span>}
                name="cPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("Password") == value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="••••••••" size="large" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="rounded-lg bg-blue-600 hover:bg-blue-700 border-none"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form.Item>

            <div className="text-center">
              <Text className="!text-gray-400">
                {isLogin ? "Don't have an account? " : "Already a member? "}
              </Text>
              <Button
                type="link"
                onClick={() => setIsLogin(!isLogin)}
                className="p-0 text-blue-400 hover:text-blue-300"
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
