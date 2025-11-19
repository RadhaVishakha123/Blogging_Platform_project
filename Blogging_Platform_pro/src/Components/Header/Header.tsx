import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
import { Drawer, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import PostPopup from "../Post/PostPopup";
import { useNavigate } from "react-router-dom";
import useSearch from "../Context/SearchContext";
import Default_User from "../../assets/Default_User.jpg";
import { useEffect } from "react";
import { useState } from "react";

export default function Header() {
  const {
    setIsModalOpen,
    isslideOpen,
    setIsSlideOpen,
    setCurrentUser,
    activeAction,
    setActiveAction,
  } = useAuth();

  const { setQuery, query, Searchdata } = useSearch();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  const [isHumburgerMenuOpen, setHumburgerMenuOpen] = useState<boolean>(false);

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
  ];
  function logoutHandelr() {
    setCurrentUser(null);
  }

  return (
    <>
      <header className="w-full bg-black text-white flex items-center justify-between z-50 px-4 py-3 shadow-md">
        <button
          className="md:hidden text-white text-7xl"
          onClick={() => setHumburgerMenuOpen(true)}
        >
          {/* Use unfold icon when menu is closed */}
          {!isHumburgerMenuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <h2
          className="text-sm font-extrabold text-white tracking-wide text-center  "
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          ShareMind
        </h2>

        <div className=" flex ">
          <NavLink to="/UserProfile">
            
            <div
              className={`
                  w-12 h-12 flex items-center justify-center rounded-xl
                   hover:bg-gray-800 transition text-white
                `}
            >
              <UserOutlined />
            </div>
          </NavLink>
          <NavLink to="/" onClick={() => logoutHandelr}>
            <div
              className={`
                  w-12 h-12 flex items-center justify-center rounded-xl
                   hover:bg-gray-800 transition text-white
                `}
            >
              <LoginOutlined />
            </div>
          </NavLink>
        </div>
      </header>
      {/* DESKTOP LEFT MENU */}
      <div className="hidden md:flex flex-col w-25 h-screen fixed left-0 top-0 mt-18 bg-black text-white border-r border-gray-700 p-4 space-y-8">
        <div className="space-y-4">
          {MenuItems.map((item) =>
            item.path ? (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActiveAction(item.name);
                  // item.action?.();
                }}
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
                  setActiveAction(item.name);
                  item.action?.();
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
      <Drawer
        open={isHumburgerMenuOpen}
        placement="left"
        title={null}
        width={100}
        className=" !bg-black top-6 !md:hidden !mt-10"
        onClose={() => setHumburgerMenuOpen(false)}
        
        closable={false}
        headerStyle={{ display: "none", margin: 0, padding: 0 }}
      >
        <div className=" flex flex-col gap-3 p-4 text-white   bg-black border-t border-gray-700  justify-around py-3 z-50">
          {MenuItems.map((item) =>
            item.path ? (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActiveAction(item.name);
                  // item.action?.();
                }}
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
                  setActiveAction(item.name);
                  item.action?.();
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
      </Drawer>

      {/* SEARCH DRAWER */}
      <Drawer
        title="Search"
        open={isslideOpen}
        placement={isMobile ? "top" : "left"}
        height={isMobile ? "40vh" : undefined}
        width={isMobile ? "100%" : 350}
        onClose={() => {
          setIsSlideOpen(false);
          setQuery("");
          // setActiveAction("Home");
        }}
      >
        <Input.Search
          prefix={<SearchOutlined />}
          placeholder="Search users..."
          size="large"
          allowClear
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4"
        />

        {/* Search results */}
        {query.trim() !== "" && (
          <div className="space-y-3">
            {Searchdata(query).length === 0 ? (
              <p className="text-gray-500 text-center">No users found.</p>
            ) : (
              Searchdata(query).map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-3 p-2 bg-black rounded hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setIsSlideOpen(false);
                    setQuery("");
                    // Navigate to the user's profile page
                    // Example using React Router:
                    // setActiveAction("");
                    navigate(`/UserProfile`, {
                      state: {
                        from: "search",
                        userId: user.userId,
                        username: user.username,
                      },
                    });
                  }}
                >
                  <img
                    src={user.profilePic ? user.profilePic : Default_User}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  />
                  <div className="text-white">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-400 text-sm">{user.fullName}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Drawer>

      <PostPopup />
    </>
  );
}
