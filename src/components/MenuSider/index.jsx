import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  MergeCellsOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
function MenuSider() {

  const location = useLocation();

  const items = [
    {
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <MergeCellsOutlined />,
      key: "/admin",
    },
    {
      label: <Link to="/info-company">Thông tin công ty</Link>,
      icon: <UserSwitchOutlined />,
      key: "/info-company",
    },
    {
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
      icon: <UnorderedListOutlined />,
      key: "/job-manage",
    },
    {
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <FileProtectOutlined />,
      key: "/cv-manage",
    },
  ];

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={location.pathname}
        items={items}
      />
    </>
  );
}

export default MenuSider;
