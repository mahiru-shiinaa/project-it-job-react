import { useEffect, useState } from "react";
import { Card, message } from "antd";
import { getListCVToCompany } from "../../services/cvServices";
import { useNavigate } from "react-router-dom";

function CVStatistic() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getListCVToCompany();
        if (result) {
          const obj = {
            total: 0,
            statusTrue: 0,
            statusFalse: 0,
          };
          obj.total = result.length;
          result.forEach((item) => {
            item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
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
    navigate("/cv-manage");
  };
  return (
    <>
      {contextHolder}
      <Card title="CV" style={{ height: "100%", border: "1.5px solid #dfdfdf" }} onClick={handleClickCard}>
        <div className="mb-10">
          <span>Số lượng CV: </span>
          <strong>{data.total}</strong>
        </div>
        <div className="mb-10">
          <span>CV đã đọc: </span>
          <strong>{data.statusTrue}</strong>
        </div>
        <div className="mb-10">
          <span>CV chưa đọc: </span>
          <strong>{data.statusFalse}</strong>
        </div>
      </Card>
    </>
  );
}

export default CVStatistic;
