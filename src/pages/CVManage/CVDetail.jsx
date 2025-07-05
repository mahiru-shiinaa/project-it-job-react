import { useParams } from "react-router-dom";
import Goback from "../../components/Goback";
import { useEffect, useState } from "react";
import { changeStatusCV, getDetailCV } from "../../services/cvServices";
import { getDetailJob } from "../../services/jobServices";
import { Card, message } from "antd";
import JobItem from "../../components/JobItem";
import { useTitle } from "../../hooks/useTitle";

function CVDetail() {
  useTitle("Chi tiết CV / IT Job");
  const { id } = useParams();
  const [cv, setCV] = useState();
  const [job, setJob] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const detailCV = await getDetailCV(id);
        const jobItem = await getDetailJob(detailCV.idJob);
      if (detailCV) {
        setCV(detailCV);
        setJob(jobItem);
      }
      await changeStatusCV(id);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: error.response?.data?.message || "Không thể lấy thông tin",
        });
        
      }
    };
    fetchApi();
  }, [id, messageApi]);
  console.log("cv", cv);
  console.log("job", job);
  return (
    <>
      {contextHolder}
      <Goback />
      {cv && (
        <Card className="mt-20" title={`Ứng viên: ${cv.name}`}>
          <div className="mb-20">
            <span>Ngày gửi: </span>
            <strong>{cv.createAt}</strong>
          </div>
          <div className="mb-20">
            <span>Số điện thoại: </span>
            <strong>{cv.phone}</strong>
          </div>
          <div className="mb-20">
            <span>Email: </span>
            <strong>{cv.email}</strong>
          </div>
          <div className="mb-20">
            <span>Thành phố ứng tuyển: </span>
            <strong>{cv.city}</strong>
          </div>
          <div className="mb-20">
            <span>Giới thiệu bản thân: </span>
            <strong>{cv.description}</strong>
          </div>
          <div className="mb-20">
            <span>Link Project: </span>
            <p>
              {cv.linkProject || "Người ứng tuyển không có Project Thực Tế"}
            </p>
          </div>
        </Card>
      )}
      {job && <JobItem className="mt-20" item={job} />}
    </>
  );
}

export default CVDetail;
