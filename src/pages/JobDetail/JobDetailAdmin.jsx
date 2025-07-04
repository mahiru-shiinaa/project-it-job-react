/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailJob } from "../../services/jobServices";
import { message, Tag } from "antd";
import Goback from "../../components/Goback";

function JobDetailAdmin() {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [messageApi, contextHolderMessage] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getDetailJob(id);
        result.createdAt = new Date(result.createdAt).toLocaleString();
        result.updatedAt = new Date(result.updatedAt).toLocaleString();
      setJobDetail(result);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
        
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {contextHolderMessage}
    <Goback />
      <h1 className="mb-10">Chi tiết công việc</h1>
      {jobDetail && (
        <>
          <h1>{jobDetail.name}</h1>
          <div className="mb-20">
            <span>Tags: </span>
            {(jobDetail.tags || []).map((item, index) => (
              <Tag color="blue" className="mb-5" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(jobDetail.city || []).map((item, index) => (
              <Tag color="orange" className="mb-5" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            <span>Mức Lương: </span>
            <strong>{jobDetail.salary}</strong>
          </div>

          <div className="mb-20">
            <span>Ngày tạo: </span>
            <strong>{jobDetail.createdAt}</strong>
          </div>
          <div className="mb-20">
            <span>Ngày cập nhập: </span>
            <strong>{jobDetail.updatedAt || ""}</strong>
          </div>
          <div className="mb-20">
            <strong>Mô tả công việc: </strong>
            <p>{jobDetail.description}</p>
          </div>
        </>
      )}
    </>
  );
}

export default JobDetailAdmin;
