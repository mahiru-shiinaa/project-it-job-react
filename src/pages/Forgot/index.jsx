import { useNavigate } from "react-router-dom";
import ForgotForm from "../../components/Form/ForgotForm";
import { message } from "antd";
import { forgotPassword } from "../../services/authServices";
import { setCookieCheck } from "../../helpers/cookie";
import { useTitle } from "../../hooks/useTitle";


function Forgot() {
    useTitle("Forgot Password / IT Job");
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        try {
            const res = await forgotPassword(values);
            messageApi.open({
                type: "success",
                content: res.message || "Không thể lấy thông tin",
            })
            setCookieCheck("email", values.email, 300);
            setTimeout(() => {
                navigate("/companys/password/otp")
            },2000);
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err.response?.data?.message || "Không thể lấy thông tin",
            });
            
        }
    }
    return (
        <>
            {contextHolder}
            <ForgotForm onFinish={onFinish} />
        </>
    );
}

export default Forgot;