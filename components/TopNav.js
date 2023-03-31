import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  let isServer = !(typeof window === "undefined");

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item key="/" onClick={(e) => setCurrent(e.key)}>
        <AppstoreOutlined />
        <Link href="/">App</Link>
      </Item>

      <Item key="/login" onClick={(e) => setCurrent(e.key)}>
        <LoginOutlined />
        <Link href="/login">Login</Link>
      </Item>

      <Item key="/register" onClick={(e) => setCurrent(e.key)}>
        <UserAddOutlined />
        <Link href="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
