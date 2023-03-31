import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Item>
        <AppstoreOutlined />
        <Link href="/">App</Link>
      </Item>

      <Item>
        <LoginOutlined />
        <Link href="/login">Login</Link>
      </Item>

      <Item>
        <UserAddOutlined />
        <Link href="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
