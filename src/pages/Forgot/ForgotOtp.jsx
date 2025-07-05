import { useNavigate } from "react-router-dom";
import CheckOtpForm from "../../components/Form/CheckOtpForm";
import {  getCookie, setCookieCheck } from "../../helpers/cookie";
import { message } from "antd";
import { otpPassword, resendOtpPassword } from "../../services/authServices";
import { useTitle } from "../../hooks/useTitle";

function ForgotOtp() {
  useTitle("Check OTP / IT Job");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    try {
      const email = getCookie("email");
      values.email = email;
      const res = await otpPassword(values);
      if (res) {
        messageApi.open({
          type: "success",
          content: res.message || "Không thể lấy thông tin",
        });
        setCookieCheck("resetToken", res.resetToken, 300);
        setTimeout(() => {
          navigate("/companys/password/reset");
        }, 3000);
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  const onResend = async () => {
    try {
      const email = getCookie("email");
      const res = await resendOtpPassword({ email: email });
      if (res) {
        messageApi.open({
          type: "success",
          content: res.message || "Không thể lấy thông tin",
        });
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  //navigate("/companys/password/reset");
  return (
    <>
      {contextHolder}
      <CheckOtpForm onFinish={onFinish} onResend={onResend} />
    </>
  );
}

export default ForgotOtp;
