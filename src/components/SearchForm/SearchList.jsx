/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServices";
import { Col, Row } from "antd";
import JobItem from "../JobItem";

function SearchList(props) {
  // nếu data rỗng thì data sẽ bằng []
  const { data = [] } = props;
  const [dataFinal, setDataFinal] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const company = await getAllCompany();
      if (company) {
        const newData = data.map((item) => {
          const infoCompany = company.find(
            (itemCompany) => itemCompany._id === item.idCompany
          );
          return {
            infoCompany: infoCompany,
            ...item,
          };
        });
        setDataFinal(newData);
      }
    };
    fetchApi();
  }, [data]);

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.map((item) => (
              <Col span={8} key={item.id || item._id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào</div>
      )}
    </>
  );
}

export default SearchList;
