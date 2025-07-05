import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goback from "../../components/Goback";
import { getDetailCompany } from "../../services/companyServices";
import { getListJobToCompany } from "../../services/jobServices";
import { Col, message, Row } from "antd";
import {
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { MdOutlineMedicalInformation } from "react-icons/md";
import JobItem from "../../components/JobItem";
import "./Company.scss";
import { useTitle } from "../../hooks/useTitle";

function CompanyDetail() {
  useTitle("Detail Công ty / IT Job");
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const companydetail = await getDetailCompany(id);
        const jobsToCompany = await getListJobToCompany(companydetail._id);
        if (companydetail && jobsToCompany) {
          setCompany(companydetail);
          const jobFinal = jobsToCompany.map((item) => ({
            infoCompany: companydetail,
            ...item,
          }));
          setJobs(jobFinal);
        }
      } catch (err) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
      }
    };
    fetchApi();
  }, [id, messageApi]);

  return (
    <>
      {company && (
        <>
          {contextHolder}
          <Goback />

          {company && (
            <div className="company-detail">
              <h1 className="company-detail__title">{company.companyName}</h1>

              <Row gutter={[16, 16]} className="company-detail__info">
                <Col span={12}>
                  <p>
                    <EnvironmentOutlined /> <strong>Địa chỉ:</strong>{" "}
                    {company.address}
                  </p>
                  <p>
                    <TeamOutlined /> <strong>Nhân sự:</strong>{" "}
                    {company.quantityPeople}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <ClockCircleOutlined /> <strong>Thời gian làm việc:</strong>{" "}
                    {company.workingTime}
                  </p>
                  <p>
                    <GlobalOutlined /> <strong>Website:</strong>{" "}
                    <a href={company.website} target="_blank" rel="noreferrer">
                      {company.website}
                    </a>
                  </p>
                </Col>
              </Row>

              <div className="company-detail__section">
                <h2>
                  <InfoCircleOutlined /> Mô tả công ty
                </h2>
                <p>{company.description}</p>
              </div>

              <div className="company-detail__section">
                <h2> <MdOutlineMedicalInformation fontSize={22} />   Chi tiết khác</h2>
                <p>{company.detail}</p>
              </div>

              <div className="company-detail__section company-detail__section--jobs ">
                <h2 > <UnorderedListOutlined /> Danh sách công việc đang tuyển</h2>
                <Row gutter={[20, 20]}>
                  {jobs.map((item) => (
                    <Col span={6} key={item._id}>
                      <JobItem item={item} />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CompanyDetail;
