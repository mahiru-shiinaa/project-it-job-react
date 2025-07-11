import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { getAllJob } from "../../services/jobServices";
import { Card, Col, Row } from "antd";
import JobItem from "../JobItem";
import { Link } from "react-router-dom";
import "./JobList.scss";

function JobList() {
  const [dataFinal, setDataFinal] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const company = await getAllCompany();
      const job = await getAllJob();
      if (company) {
        const newData = job.map((item) => {
          const infoCompany = company.find(
            (itemCompany) => itemCompany._id === item.idCompany
          );
          return {
            infoCompany: infoCompany,
            ...item,
          };
        });
        setDataFinal(newData.reverse());
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <h3>Danh sách một số job đang ứng tuyển</h3>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.slice(0, 7).map((item) => (
              <Col span={6} key={item.id || item._id}>
                <JobItem item={item} />
              </Col>
            ))}
            {dataFinal.length > 5 && (
              <Col span={6} className="job-list__col">
                <Link to="/jobs" className="job-list__link">
                  <Card
                    className="job-list__card job-list__card--more"
                    hoverable
                  >
                    <span>Xem thêm...</span>
                  </Card>
                </Link>
              </Col>
            )}
          </Row>
        </div>
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào</div>
      )}
    </>
  );
}

export default JobList;
