import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../services/jobServices";


function DeleteJob(props) {
  const { handleReload, record } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const confirm = async () => {
    try {
      const delJob = await deleteJob(record._id);
    if (delJob) {
      handleReload();
    }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể xóa Job",
      });
      
    }
  };
  
  return (
    <>
    {contextHolder}
      <Popconfirm
        title="Xóa Job này?"
        description="Bạn có chắc muốn xóa Job này?"
        onConfirm={confirm}
        okText="Có"
        cancelText="Không"
      >
        <Button color="danger" variant="outlined" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}

export default DeleteJob;
