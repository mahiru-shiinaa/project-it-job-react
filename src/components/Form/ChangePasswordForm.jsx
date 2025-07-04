import { Button, Col, Form, Input, Row } from "antd";
import reset from "../../assets/images/reset.png";
import Container from "../Container";
import "./Form.scss";
import { runes } from "runes2";

function ChangePasswordForm(props) {
  const { onFinish , form } = props;
  return (
    <>
      <Container>
        <div className="card-change-password">
          <Row justify={"center"}>
            <Col span={24}>
              <div className="card-change-password__icon">
                <img src={reset} alt="" />
              </div>
            </Col>
            <Col span={24}>
              <div className="card-change-password__title">
                <h2>Change password?</h2>
                <p>
                  Nhập mật khẩu mới của bạn
                </p>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form
                  layout="vertical"
                  form={form}
                  style={{ width: "100%", maxWidth: 400, textAlign: "center" }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Password Cũ"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { min: 8, message: "Password tối thiểu 8 kí tự" },
                    ]}
                  >
                    <Input.Password
                      className="card-change-password__input"
                      placeholder="Test12345@"
                      count={{
                        show: true,
                        strategy: (txt) => runes(txt).length,
                      }}
                      
                    />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { min: 8, message: "Password tối thiểu 8 kí tự" },
                    ]}
                  >
                    <Input.Password
                      className="card-change-password__input"
                      placeholder="Test12345@"
                      count={{
                        show: true,
                        strategy: (txt) => runes(txt).length,
                      }}
                      
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="newPassword2"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input your confirm password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu không khớp nhau")
                          );
                        },
                      }),
                      
                    ]}
                  >
                    <Input.Password
                      className="card-change-password__input"
                      placeholder="Test12345@"
                      count={{
                        show: true,
                        strategy: (txt) => runes(txt).length,
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="card-change-password__send"
                      htmlType="submit"
                    >
                      Xác nhận đổi mật khẩu
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

export default ChangePasswordForm;
