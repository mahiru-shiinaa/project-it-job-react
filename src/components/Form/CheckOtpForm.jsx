import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import Container from "../Container";
import iconotp from "../../assets/images/iconotp.png";
import "./Form.scss"
function CheckOtpForm(props) {
  const { onFinish, onResend } = props;

  // Khai báo biến trạng thái để lưu số giây đếm ngược
  const [countdown, setCountdown] = useState(60);

  // useEffect này sẽ chạy mỗi khi giá trị countdown thay đổi
  useEffect(() => {
    // Nếu countdown đã = 0 thì không cần đếm nữa => return luôn, không tạo interval
    if (countdown === 0) return;

    // Tạo một interval chạy mỗi 1 giây (1000ms)
    const timer = setInterval(() => {
      // Cập nhật countdown: mỗi lần trừ đi 1 giây
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup function: hàm này sẽ chạy khi component unmount
    // hoặc trước khi chạy effect kế tiếp (khi countdown thay đổi)
    return () => clearInterval(timer);
  }, [countdown]); // <- effect này sẽ chạy mỗi khi countdown thay đổi

  return (
    <>
      <Container>
        <Card className="card-otp">
          <Row justify={"center"}>
            <Col span={24}>
              <div className="card-otp__icon">
                <img src={iconotp} alt="" />
              </div>
            </Col>
            <Col span={24}>
              <div className="card-otp__title">
                <h2>Verify Your Email Address</h2>
                <p>
                  Mã otp đã được gửi qua email của bạn <br />
                  Vui lòng xác nhận otp để hoàn tất hành động
                </p>
              </div>
            </Col>
            <Col span={24}>
              <Form style={{ textAlign: "center" }} onFinish={onFinish}>
                <Form.Item name={"otp"} hasFeedback validateStatus="success">
                  <Input.OTP variant="filled" type="number" />
                </Form.Item>
                <Form.Item label={null}>
                  <Button
                    type="primary"
                    className="card-otp__send"
                    htmlType="submit"
                  >
                    Xác nhận email
                  </Button>
                  {<br />}
                  <Button
                    className="card-otp__resend"
                    type="link"
                    disabled={countdown > 0}
                    onClick={ async() => {
                      setCountdown(60);
                      onResend();
                    }}
                  >
                    {countdown > 0 ? `Gửi lại otp (${countdown}s)` : "Gửi lại Otp"}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default CheckOtpForm;
