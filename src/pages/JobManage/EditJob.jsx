import { Button, Form, message, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import JobDetailForm from "../../components/Form/JobDetailForm";
import { updateJob } from "../../services/jobServices";
import { getListTag } from "../../services/tagServices";
import { getListCity } from "../../services/cityServices";

function EditJob(props) {
  const { handleReload, record } = props;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
      const fetchApi = async () => {
        try {
          const tags = await getListTag();
          const city = await getListCity();
          if (tags && city) {
            setTags(tags);
            setCity(city);
          }
        } catch (err) {
          messageApi.open({
            type: "error",
            content: err.response?.data?.message || "Không thể lấy thông tin",
          });
        }
      };
      fetchApi();
    }, [ messageApi]);

  const handleFinish = async (values) => {
    try {
      const result = await updateJob(record._id, values);
    if (result) {
      messageApi.open({
        type: "success",
        content: "Cập nhật job thành công",
        duration: 5,
      });
      setShowModal(false);
      handleReload();
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật job không thành công",
        duration: 5,
      });
    }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
      
    }

  };
  const handleClick = () => {
    setShowModal(true);
    form.setFieldsValue(record);
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa" color="blue">
        <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: "10px" }}
          icon={<EditOutlined />}
          onClick={handleClick}
        />
      </Tooltip>
      <Modal
        title="Form cập nhập Job"
        centered
        width={1000}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {record && (
          <JobDetailForm
            form={form}
            onFinish={handleFinish}
            tags={tags} // hoặc truyền tags thực tế vào
            city={city} // hoặc truyền city thực tế vào
            actionText="Cập nhật"
          />
        )}
      </Modal>
    </>
  );
}

export default EditJob;
