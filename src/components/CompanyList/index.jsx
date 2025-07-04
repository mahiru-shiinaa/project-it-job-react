import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import {  Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./CompanyList.scss";

function CompanyList() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAllCompany();
        if (result) {
          setCompany(result.reverse());
        }
      } catch (err) {
        alert(err.response?.data?.message || "Không thể lấy thông tin");
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <h3>Danh sách một số công ty</h3>
      {company.length > 0 && (
        <>
          <Row gutter={[20, 20]} className="company-list__row">
            {company.slice(0, 7).map((item) => (
              <Col span={6} key={item._id} className="company-list__col">
                <Link
                  to={`/companys/info/${item._id}`}
                  className="company-list__link"
                >
                  <Card className="company-list__card" hoverable>
                    <div className="company-list__item">
                      <div className="company-list__field">
                        <span className="company-list__label">Công ty:</span>
                        <strong className="company-list__value">
                          {item.companyName}
                        </strong>
                      </div>
                      <div className="company-list__field">
                        <span className="company-list__label">Số nhân sự:</span>
                        <strong className="company-list__value">
                          {item.quantityPeople}
                        </strong>
                      </div>
                      <div className="company-list__field">
                        <span className="company-list__label">Địa chỉ:</span>
                        <strong className="company-list__value">
                          {item.address}
                        </strong>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}

            {company.length > 2 && (
              <Col span={6} className="company-list__col">
                <Link to="/company" className="company-list__link">
                  <Card
                    className="company-list__card company-list__card--more"
                    hoverable
                  >
                    <span>Xem thêm...</span>
                  </Card>
                </Link>
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default CompanyList;
