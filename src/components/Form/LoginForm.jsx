import { Button, Card, Col, Input, Row, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { runes } from "runes2";
import logo from "../../assets/images/logo.png";
import "./Form.scss";
function LoginForm(props) {
  const { onFinish } = props;
  const navigate = useNavigate();
  return (
    <>
              <Row justify={"center"}>
          <Col span={24}>
            <Card className="card-login">
              <div className="card-login__header">
                <img className="card-login__icon" src={logo} alt="" />
                <div className="card-login__title">
                  <h3>Welcome</h3>
                  <p>Đăng nhập dành cho nhà tuyển dụng</p>
                </div>
              </div>
              <div className="card-login__form">
                <Form name="registerForm" onFinish={onFinish} layout="vertical">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                  >
                    <Input className="card-login__input" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    className="card-login__input--password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="card-login__input"
                      count={{
                        show: true,
                        strategy: (txt) => runes(txt).length,
                      }}
                    />
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button
                      className="card-login__forgot"
                      onClick={() => navigate("/companys/password/forgot")}
                      type="link"
                    >
                      Quên mật khẩu?
                    </Button>
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button
                      className="card-login__btn"
                      type="primary"
                      htmlType="submit"
                    >
                      Đăng nhập
                    </Button>
                   <div className="card-login__footer">
                     {"Chưa có tài khoản?"}
                    <Button
                      className="card-login__register"
                      onClick={() => navigate("/auth/register")}
                      type="link"
                    >
                      Đăng ký ngay!
                    </Button>
                   </div>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
    </>
  );
}

export default LoginForm;
