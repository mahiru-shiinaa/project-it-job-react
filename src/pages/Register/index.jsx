import { Button, message, Modal, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Form/RegisterForm";
import { cancelRegister, register } from "../../services/authServices";
import { useState } from "react";
import { deleteCookie, getCookie, setCookieCheck } from "../../helpers/cookie";
import Container from "../../components/Container";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const onFinish = async (values) => {
    try {
      await register(values);
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        setOpen(true);
        messageApi.open({
          type: "success",
          content: "Đăng ký thành công, vui lòng xác nhận email để tiếp tục",
        });
      }, 3000);

      setCookieCheck("email", values.email, 300);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  const handleCancelRegister = async () => {
    setOpen(false);
    try {
      const emailCancel = getCookie("email");
      const res = await cancelRegister({ email: emailCancel });
      if (res) {
        messageApi.open({
          type: "success",
          content: res.message || "Không thể lấy thông tin",
        });
        deleteCookie("email");
        navigate("/auth/register");
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Spin
        spinning={spinning}
        tip={
          <>
            <h2>Đang tiến hành xác nhận thông tin</h2>
          </>
        }
        size="large"
      >
        <Container>
          <RegisterForm onFinish={onFinish} />
        </Container>
      </Spin>

      <Modal
        closable={false}
        maskClosable={false}
        centered
        open={open}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Result
          status="success"
          title="Lưu thông tin thành công!"
          subTitle={
            <>
              <h3>Vui lòng xác nhận email để hoàn tất đăng ký</h3>
            </>
          }
          extra={[
            <Button key="buy" onClick={handleCancelRegister}>
              Hủy đăng ký
            </Button>,
            <Button
              type="primary"
              onClick={() => navigate("/auth/check-email-otp")}
              key="console"
            >
              Xác nhận email
            </Button>,
          ]}
        />
      </Modal>
    </>
  );
}

export default Register;

// messageApi.open({
//   type: "success",
//   content: "Đã Đăng Ký Thành Công",
// });
