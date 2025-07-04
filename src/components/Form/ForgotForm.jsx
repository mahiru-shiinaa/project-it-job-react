import { Button, Col, Form, Input, Row } from "antd";
import Container from "../Container";
import forgot from "../../assets/images/forgot.png";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
function ForgotForm(props) {
  const { onFinish } = props;
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="card-email">
          <Row justify={"center"}>
            <Col span={24}>
              <div className="card-email__icon">
                <img src={forgot} alt="" />
              </div>
            </Col>
            <Col span={24}>
              <div className="card-email__title">
                <h2>Forgot your password?</h2>
                <p>
                  Vui lòng nhập email của bạn <br />
                  Mã OTP xác minh sẽ được gửi tới email của bạn
                </p>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form
                  layout="vertical"
                  style={{ width: "100%", maxWidth: 400, textAlign: "center" }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      className="card-email__input"
                      placeholder="abc@gmail.com"
                      type="email"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="card-email__send"
                      htmlType="submit"
                    >
                      Gửi mã otp
                    </Button>
                    <br />
                    <Button type="link" onClick={() => navigate("/auth/login")} className="card-email__back">
                      Back to login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default ForgotForm;
