import { useNavigate } from "react-router-dom";
import CheckOtpForm from "../../components/Form/CheckOtpForm";
import { deleteCookie, getCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import {
  checkEmailOtp,
  resendCheckEmailOtp,
} from "../../services/authServices";
import { message } from "antd";
import { fetchUser } from "../../redux/actions/auth.action";
import { useTitle } from "../../hooks/useTitle";

function CheckEmailOtp() {
  useTitle("Check Email - IT Job");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (value) => {
    try {
      const email = getCookie("email");
      value.email = email;
      const res = await checkEmailOtp(value);
      if (res) {
        messageApi.open({
          type: "success",
          content: res.message || "Không thể lấy thông tin",
        });
        dispatch(fetchUser());
        deleteCookie("email");
        setTimeout(() => {
          navigate("/");
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
      await resendCheckEmailOtp({ email: email });
      messageApi.open({
        type: "success",
        content: "Mã OTP mới được gửi",
      });
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
      <CheckOtpForm onResend={onResend} onFinish={onFinish} />
    </>
  );
}

export default CheckEmailOtp;
