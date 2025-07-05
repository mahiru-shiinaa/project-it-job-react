import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JobList from "./JobList";
import { useTitle } from "../../hooks/useTitle";

function JobManage() {
  useTitle("Quản lý job - IT Job");
  return (
    <>
      <h1>Danh sách việc làm</h1>
      <Link to="/create-job">
        <Button icon={<PlusOutlined />} > Tạo Job mới</Button>
      </Link>
      <JobList className="mt-20" />
    </>
  );
}

export default JobManage;
