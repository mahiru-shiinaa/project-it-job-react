import { Form, message,  } from "antd";

import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagServices";
import { getListCity } from "../../services/cityServices";
import GoBack from "../../components/Goback";
import { createJob } from "../../services/jobServices";
import JobDetailForm from "../../components/Form/JobDetailForm";
import { useTitle } from "../../hooks/useTitle";

function CreateJob() {
  useTitle("Tạo job / IT Job");
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
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
        
      }
    };
    fetchApi();
  }, [ messageApi]);

  const handleFinish = async (values) => {
    try {
      const result = await createJob(values);
    if (result) {
      messageApi.open({
        type: "success",
        content: "Tạo job mới thành công",
        duration: 5,
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo job mới không thành công",
        duration: 5,
      });
    }
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
      <GoBack />
      <h1>Tạo job mới</h1>
      <JobDetailForm
        form={form}
        onFinish={handleFinish}
        tags={tags}
        city={city}
        actionText="Tạo"
      />
     
    </>
  );
}

export default CreateJob;
