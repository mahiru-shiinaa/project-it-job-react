import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteOnCV } from "../../services/cvServices";

function DeleteCV(props) {
  const { handleReload, record } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const confirm = async () => {
    try {
      const delCV = await deleteOnCV(record._id);
      if (delCV) {
        messageApi.open({
          type: "success",
          content: delCV.message || "Không thể xóa CV",
        })
        handleReload();
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể xóa CV",
      });

    }
  };
  return (
    <>
    {contextHolder}
      <Popconfirm
        title="Xóa CV này?"
        description="Bạn có chắc muốn xóa CV này?"
        onConfirm={confirm}
        okText="Có"
        cancelText="Không"
      >
        <Button color="danger" variant="outlined" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}

export default DeleteCV;
