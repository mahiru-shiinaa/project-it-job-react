import {  useEffect, useState } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function InfoCompany() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const company = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchApi = async () => {
      setData(company);
    }
    fetchApi();
  }, [company]);
  const handleClickCard = () => {
    
    navigate("/info-company");
  }
  return (
    <>
      {data && (
        <>
          <Card title="Thông tin công ty" style={{ height: "100%", border: "1.5px solid #dfdfdf"   }} onClick={handleClickCard}>
            <div className="mb-10">
              <span>Tên công ty: </span>
              <strong>{data.companyName}</strong>
            </div>
            <div className="mb-10">
              <span>Email: </span>
              <strong>{data.email}</strong>
            </div>
            <div className="mb-10">
              <span>SDT: </span>
              <strong>{data.phone}</strong>
            </div>
            <div className="mb-10">
              <span>Số nhân viên: </span>
              <strong>{data.quantityPeople}</strong>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default InfoCompany;
