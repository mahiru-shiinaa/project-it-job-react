import { Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import Container from "../../components/Container";
import "./LayoutDefault.scss";
import { LogoutOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function LayoutDefault() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <header>
        <div className="header__logodefault">
          <Link to="/">IT Jobs</Link>
        </div>
        <div className="menu">
          <nav>
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button
                    size="large"
                    icon={<UserSwitchOutlined />}
                    className="button"
                  >
                    Quản lý
                  </Button>
                </Link>
                <Link to="/auth/logout">
                  <Button
                    size="large"
                    className="button"
                    icon={<LogoutOutlined />}
                  >
                    Đăng Xuất
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button size="large" className="button">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="large" className="button" type="primary">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <p>Copyright © 2025 by hieuj2k4.</p>
      </footer>
    </>
  );
}

export default LayoutDefault;
