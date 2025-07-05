import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { message } from "antd";
import { login } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions/auth.action";
import Container from "../../components/Container";
import { useTitle } from "../../hooks/useTitle";

function Login() {
  useTitle("Đăng nhập / IT Job");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      await login({email, password});
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      dispatch(fetchUser());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Container>
        <LoginForm onFinish={onFinish} />
      </Container>
    </>
  );
}

export default Login;
