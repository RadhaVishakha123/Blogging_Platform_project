import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from 'antd'
import {FloatButton,Typography,Divider,Row,Col} from 'antd'
import { PlusOutlined, MessageOutlined,SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default function Prcative(){
      const [Text, setText] = useState("Editable text content.")
    return(<>
    <div style={{ height: '150vh', padding: '20px', backgroundColor:"white" }}>
      <Button type="primary" loading={false} >save
      </Button>
      <p>Scroll down and see the button stay fixed!</p>
      {/* Ant Design provides a ready-to-use “Back to Top” float button:
     when clik on this then back to top,(buttom on bottom right)
     */}
      <FloatButton.Group >
      <FloatButton.BackTop tooltip="Go Top" />
      <FloatButton icon={<PlusOutlined />}  type="primary" />
      <FloatButton icon={<MessageOutlined />} tooltip={<div>Chat</div>} />
      </FloatButton.Group> 
      {/* when hover in this + icon then inside float button show */}
      <FloatButton.Group
      trigger="hover"
      type="primary"
      icon={<PlusOutlined />}
      style={{ right: 24 }}
    >
      <FloatButton icon={<MessageOutlined />} tooltip="Chat" />
      <FloatButton icon={<SettingOutlined />} tooltip="Settings" />
    </FloatButton.Group>
    <Typography.Title level={3} type='danger'>Welcome</Typography.Title>
    {/* You see “Click here to edit this text”.
Click it — it turns into a text box.
Edit it → Press Enter → The new value is saved in setText. */}
<Typography.Paragraph  editable={{ onChange: setText }}>
  {Text}
</Typography.Paragraph>
{/* orientation
"left" / "center" / "right" 
type="vertical" keeps the divider vertical
orientationMargin, you can add space between the text and the line’s start.
*/}

<Divider style={{ borderColor: "#722ed1", color: "#722ed1" }} orientation='center' orientationMargin="50px" dashed>Next Paragraph</Divider>
{/* Shows only 2 lines → a “Read more” link → expands text when clicked. */}
<Typography.Paragraph ellipsis={{ rows:2 ,expandable:true, symbol: "Read more" }}>
      Ant Design is a design system for enterprise-level products. It provides
      a set of high-quality React components, out of the box, which are
      written in TypeScript.
    </Typography.Paragraph>
{/* gutter controls the spacing between columns — horizontally or vertically. */}
<Row gutter={[24,24]}> 
{/* Row in Ant Design’s Grid is divided into 24 equal parts.
order can be any number */}
  <Col span={8} order={3}><div style={{ background: "#bae7ff", padding: 10 }}>A</div></Col>
  <Col span={8} order={2}><div style={{ background: "#91d5ff", padding: 10 }}>B</div></Col>
  <Col span={8} order={1}><div style={{ background: "#69c0ff", padding: 10 }}>C</div></Col>
</Row>




      </div>

    </>)
}