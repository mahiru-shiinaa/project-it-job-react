import { message } from "antd";
import ResetPasswordForm from "../../components/Form/ResetPasswordFrom";
import { deleteCookie, getCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions/auth.action";

import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authServices";
import { useTitle } from "../../hooks/useTitle";

function ResetPassword() {
    useTitle("Reset Password / IT Job");
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
        const resetPasswordObject = {
            newPassword: values.newPassword,
            resetToken: getCookie("resetToken"),
            email: getCookie("email")
        }

        const res = await resetPassword(resetPasswordObject);
            if (res) {
                messageApi.open({
                    type: "success",
                    content: res.message || "Không thể lấy thông tin",
                });
                deleteCookie("email");
                deleteCookie("resetToken");
                dispatch(fetchUser());
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            
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
            <ResetPasswordForm onFinish={onFinish} />
        </>
    );
}

export default ResetPassword;