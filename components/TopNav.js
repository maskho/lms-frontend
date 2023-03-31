import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  let isServer = !(typeof window === "undefined");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        icon={<AppstoreOutlined />}
        onClick={(e) => setCurrent(e.key)}
      >
        <Link href="/">App</Link>
      </Item>

      {user === null ? (
        <>
          <Item
            key="/login"
            icon={<LoginOutlined />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/login">Login</Link>
          </Item>

          <Item
            key="/register"
            icon={<UserAddOutlined />}
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/register">Register</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          icon={<UserOutlined />}
          title={user && user.name}
          className="float-end"
        >
          <ItemGroup>
            <Item key="/user" icon={<DashboardOutlined />}>
              <Link href="/user">Dashboard</Link>
            </Item>

            <Item
              key="/logout"
              icon={<LogoutOutlined />}
              onClick={logout}
              className="float-end"
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
