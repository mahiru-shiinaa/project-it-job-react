import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { Card, Col, message, Pagination, Row } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import Goback from "../../components/Goback";

function Company() {
  const [company, setCompany] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Khối Pagination
    const [searchParams, setSearchParams] = useSearchParams();
  const [currentPageData, setCurrentPageData] = useState([]);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 12;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAllCompany();
        if (result) {
          setCompany(result);
        }
      } catch (err) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
      }
    };
    fetchApi();
  }, [messageApi]);

    // Chia phân trang
  useEffect(() => {
    if (Array.isArray(company)) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setCurrentPageData(company.slice(start, end));
    }
  }, [company, page]);
    // Khi đổi page → cập nhật URL param
  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage,
    });
     // 👉 Scroll lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth", // cuộn mượt
  });
  };

  return (
    <>
      {contextHolder}
      <Goback />
      <h1>Danh sách một số công ty</h1>
      {company.length > 0 && (
        <>
          <Row gutter={[20, 20]}>
            {currentPageData.map((item) => (
              <Col span={6} key={item.id || item._id}>
                <Link to={`/companys/info/${item._id}`}>
                  <Card className="mb-20">
                    <div className="mb-10">
                      <span>Công ty: </span>
                      <strong>{item.companyName}</strong>
                    </div>
                    <div className="mb-10">
                      <span>Số nhân sự: </span>
                      <strong>{item.quantityPeople}</strong>
                    </div>
                    <div className="mb-10">
                      <span>Địa chỉ: </span>
                      <strong>{item.address}</strong>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
            <div className="mt-20" style={{ textAlign: "center" }}>
            <Pagination
              align="center"
              current={page}
              pageSize={pageSize}
              total={company.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Company;
