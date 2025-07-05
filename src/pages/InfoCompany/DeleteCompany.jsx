import { Button, message, Modal } from "antd";
import { useState } from "react";
import DeleteAccountForm from "../../components/Form/DeleteAccountForm";
import { deleteAccount } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions/auth.action";


function DeleteCompany() {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
        try {
            const res = await deleteAccount();
            console.log('res', res);
            messageApi.open({
                type: "success",
                content:  res.message || "Không thể xóa tài khoản",
            })
            setTimeout(() => {
                dispatch(fetchUser());
                navigate("/");  
            },2000);
    setOpen(false);
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err.response?.data?.message || "Không thể xóa tài khoản",
            });
            
        }
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" className="mr-10" danger onClick={() => setOpen(true)}>
        Xóa tài khoản
      </Button>

      <Modal
        centered
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
                width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "30%",
        }}
      >
        <DeleteAccountForm
          onDelete={handleDelete}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}

export default DeleteCompany;
