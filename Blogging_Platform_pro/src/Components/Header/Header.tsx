import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
import { useState } from "react";
import { Drawer, Modal, Input, Upload, Button, List } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import PostPopup from "../Post/PostPopup";

export default function Header() {
  const [activeAction, setActiveAction] = useState<string>("");
  const {
    setIsModalOpen,
    isslideOpen,
    setIsSlideOpen,
    setImageFile,
    CurrentUser,
  } = useAuth();
  const uploadProps = {
    beforeUpload: (file: any) => {
      setImageFile(file);
      return false; // prevent auto upload
    },
    showUploadList: false,
    maxCount: 1,
  };
  const isMobile = window.innerWidth < 768;

  const MenuItems = [
    { name: "Home", icon: <HomeOutlined />, path: "/Home" },
    {
      name: "Search",
      icon: <SearchOutlined />,
      action: () => {
        setIsSlideOpen(true);
        setActiveAction("Search");
      },
    },
    {
      name: "Create",
      icon: <PlusCircleOutlined />,
      action: () => {
        setIsModalOpen(true);
        setActiveAction("Create");
      },
    },
    { name: "Profile", icon: <UserOutlined />, path: "/UserProfile" },
  ];

  return (
    <>
      {/* DESKTOP LEFT MENU */}
      <div className="hidden md:flex flex-col w-25 h-screen fixed left-0 top-0 bg-black text-white border-r border-gray-700 p-4 space-y-8">
        <h2
          className="text-sm font-extrabold text-white tracking-wide text-center "
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          ShareMind
        </h2>

        <div className="space-y-4">
          {MenuItems.map((item) =>
            item.path ? (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setActiveAction(item.name)}
                className="flex justify-center"
              >
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-xl text-xl
                    ${
                      activeAction === item.name
                        ? "bg-gray-700 text-white"
                        : " text-gray-300"
                    }
                    hover:bg-gray-800 transition
                  `}
                >
                  {item.icon}
                </div>
              </NavLink>
            ) : (
              <div
                key={item.name}
                onClick={() => {
                  item.action?.();
                  setActiveAction(item.name);
                }}
                className="flex justify-center cursor-pointer"
              >
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-xl text-xl
                    ${
                      activeAction === item.name
                        ? "bg-gray-700 text-white"
                        : " text-gray-300"
                    }
                    hover:bg-gray-800 transition
                  `}
                >
                  {item.icon}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-700 flex justify-around py-3 z-50">
        {MenuItems.map((item) =>
          item.path ? (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setActiveAction(item.name)}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-xl
                  ${
                    activeAction === item.name
                      ? "bg-gray-700 text-white"
                      : " text-gray-300"
                  }
                   hover:bg-gray-800 transition
                `}
              >
                {item.icon}
              </div>
            </NavLink>
          ) : (
            <div
              key={item.name}
              onClick={() => {
                item.action?.();
                setActiveAction(item.name);
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-xl
                  ${
                    activeAction === item.name
                      ? "bg-gray-700 text-gray-300"
                      : " text-gray-300"
                  }
                   hover:bg-gray-800 transition
                `}
              >
                {item.icon}
              </div>
            </div>
          )
        )}
      </div>

      {/* SEARCH DRAWER */}
      <Drawer
        title="Search"
        open={isslideOpen}
        placement={isMobile ? "top" : "left"}
        height={isMobile ? "40vh" : undefined}
        width={isMobile ? "100%" : 350}
        onClose={() => setIsSlideOpen(false)}
      >
        <Input.Search
          prefix={<SearchOutlined />}
          placeholder="Search posts..."
          size="large"
          allowClear
        />
      </Drawer>
      <PostPopup />
      
    </>
  );
}
