import Container from "../Container";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { runes } from "runes2";
import logo from "../../assets/images/logo.png";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
  const { onFinish } = props;
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row justify={"center"}>
          <Col span={24}>
            <Card className="card-register">
              <div className="card-register__header">
                <img className="card-register__icon" src={logo} alt="" />
                <div className="card-register__title">
                  <h3>Đăng ký</h3>
                  <p>Đăng ký dành cho nhà tuyển dụng</p>
                </div>
              </div>
              <div className="card-register__form">
                <Form
                  name="registerForm"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Tên công ty"
                    name="companyName"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên công ty" },
                    ]}
                  >
                    <Input className="card-register__input" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                  >
                    <Input className="card-register__input" />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input className="card-register__input" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    className="card-login__input--password"
                    count={{
                      show: true,
                      strategy: (txt) => runes(txt).length,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { min: 8, message: "Password tối thiểu 8 kí tự" },
                    ]}
                  >
                    <Input.Password
                      count={{
                        show: true,
                        strategy: (txt) => runes(txt).length,
                      }}
                      className="card-register__input"
                    />
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button
                      className="card-register__btn"
                      type="primary"
                      htmlType="submit"
                    >
                      Đăng Ký
                    </Button>
                    <div className="card-register__footer">
                      {"Đã có tài khoản?"}
                      <Button
                        className="card-register__register"
                        onClick={() => navigate("/auth/login")}
                        type="link"
                      >
                        Đăng nhập ngay!
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegisterForm;
