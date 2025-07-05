/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { getJobByCompany } from "../../services/jobServices";
import { Button, message, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import getColumnSearchProps from "../../helpers/getColumnSearchProps";


function JobList(props) {
  const { className = "" } = props;
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true, // Cho phép người dùng chọn số dòng / trang
    pageSizeOptions: ["5", "10", "20", "50"], // Các lựa chọn số dòng / trang
    showQuickJumper: true, // Cho phép nhảy trang
  });

  const [searchText, setSearchText] = useState(""); // Chuỗi tìm kiếm
  const [searchedColumn, setSearchedColumn] = useState(""); // Cột đang tìm kiếm
  const searchInput = useRef(null); // Tham chiếu đến ô input tìm kiếm
  const fetchApi = async () => {
    try {
      const result = await getJobByCompany();
      if (result) {
        result.forEach((item) => {
          item.createdAt = new Date(item.createdAt).toLocaleString();
          item.updatedAt = new Date(item.updatedAt).toLocaleString();
        });
        setData(result.reverse());
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const handleReload = () => {
    fetchApi();
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "stt",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Tên Job",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps(
        "name",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        searchInput
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      ...getColumnSearchProps(
        "tags",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        searchInput
      ),
      render: (tags) => {
        return tags.map((item, index) => {
          return (
            <Tag color="blue" key={index}>
              {item}
            </Tag>
          );
        });
      },
    },
    {
      title: "Mức Lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      dataIndex: "",
      key: "createAt",
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createdAt}</small>
          <br />
          <small>Cập nhập: {record.updatedAt}</small>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
      render: (status) => (
        <>
          {status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang Tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/detail-job/${record._id}`}>
            <Tooltip title="Chi tiết">
              <Button
                style={{ marginRight: "10px" }}
                icon={<EyeOutlined />}
                color="cyan"
                variant="outlined"
              />
            </Tooltip>
          </Link>
          <EditJob record={record} handleReload={handleReload} />
          <DeleteJob record={record} handleReload={handleReload} />
        </>
      ),
    },
  ];
  return (
    <>
     {contextHolder}
      <div className={className}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={"_id"}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default JobList;
