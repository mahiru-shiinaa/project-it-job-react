import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { getAllJob } from "../../services/jobServices";
import { Col, Pagination, Row } from "antd";
import JobItem from "../../components/JobItem";
import Goback from "../../components/Goback";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

function Job() {
  useTitle("Danh sách job / IT Job");
    const [dataFinal, setDataFinal] = useState([]);
     // Khối Pagination
    const [searchParams, setSearchParams] = useSearchParams();
  const [currentPageData, setCurrentPageData] = useState([]);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 12;
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

      // Chia phân trang
  useEffect(() => {
    if (Array.isArray(dataFinal)) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setCurrentPageData(dataFinal.slice(start, end));
    }
  }, [dataFinal, page]);
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
    <Goback />
      <h2>Danh sách các job</h2>
      {dataFinal.length > 0 ? (
        <>
                <div className="mt-20">
          <Row gutter={[20, 20]}>
            {currentPageData.map((item) => (
              <Col span={6} key={item.id || item._id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
           <div className="mt-20" style={{ textAlign: "center" }}>
            <Pagination
              align="center"
              current={page}
              pageSize={pageSize}
              total={dataFinal.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
        
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào</div>
      )}
    </>
  );
}

export default Job;