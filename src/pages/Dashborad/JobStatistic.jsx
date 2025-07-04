import { useEffect, useState } from "react";
import { getJobByCompany } from "../../services/jobServices";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";

function JobStatistic() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getJobByCompany();
        if (result) {
          const obj = {
            total: 0,
            statusTrue: 0,
            statusFalse: 0,
          };
          obj.total = result.length;
          result.forEach((item) => {
            item.status ? obj.statusTrue++ : obj.statusFalse++;
          });
          setData(obj);
        }
      } catch (err) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
      }
    };
    fetchApi();
  }, [messageApi]);
  const handleClickCard = () => {
    navigate("/job-manage");
  };
  return (
    <>
      {contextHolder}
      {data && (
        <>
          <Card
            style={{ height: "100%", border: "1.5px solid #dfdfdf" }}
            title="Job"
            onClick={handleClickCard}
          >
            <div className="mb-10">
              <span>Số lượng job: </span>
              <strong>{data.total}</strong>
            </div>
            <div className="mb-10">
              <span>Job đang bật: </span>
              <strong>{data.statusTrue}</strong>
            </div>
            <div className="mb-10">
              <span>Job đang tắt: </span>
              <strong>{data.statusFalse}</strong>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default JobStatistic;
