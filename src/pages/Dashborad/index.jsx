
import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import InfoCompany from "./InfoCompany";
import { useTitle } from "../../hooks/useTitle";

function Dashboard() {
    useTitle("Trang Dashborad / IT Job");
    return (
        <>
           <h1>Tổng quan</h1>
           <Row gutter={[20, 20]} >
                <Col span={8}>
                <JobStatistic />
                </Col>
                <Col span={8}>
                <CVStatistic />
                </Col>
                <Col span={8}>
                <InfoCompany />
                </Col>
           </Row>

            
        </>
    );
}

export default Dashboard;