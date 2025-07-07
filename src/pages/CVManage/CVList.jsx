/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { getListCVToCompany } from "../../services/cvServices";
import { getJobByCompany } from "../../services/jobServices";
import { Button, message, Table, Tag } from "antd";
import DeleteCV from "./DeleteCV";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import getColumnSearchProps from "../../helpers/getColumnSearchProps";
function CVList(props) {
  const { className = "" } = props;
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState(""); // Chuỗi tìm kiếm
  const [searchedColumn, setSearchedColumn] = useState(""); // Cột đang tìm kiếm
  const searchInput = useRef(null); // Tham chiếu đến ô input tìm kiếm
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true, // Cho phép người dùng chọn số dòng / trang
    pageSizeOptions: ["5", "10", "20", "50"], // Các lựa chọn số dòng / trang
    showQuickJumper: true, // Cho phép nhảy trang
  });
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const fetchApi = async () => {
    try {
      const result = await getListCVToCompany();
      const job = await getJobByCompany();
      if (result) {
        const newData = result.map((item) => {
          const jobItem = job.find((job) => job._id === item.idJob);
          return {
            ...item,
            createdAt: new Date(item.createdAt).toLocaleString(),
            nameJob: jobItem ? jobItem.name : "Chưa có tên",
          };
        });
        setData(newData.reverse());
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
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
      dataIndex: "nameJob",
      key: "nameJob",
      ...getColumnSearchProps(
        "nameJob",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        searchInput
      ),
    },
    {
      title: "Tên ứng viên",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      sorter: (a, b) => a.statusRead - b.statusRead,
      onFilter: (value, record) => record.statusRead === (value === "true"),
      filters: [
        { text: "Đã đọc", value: "true" },
        { text: "Chưa đọc", value: "false" },
      ],
      render: (statusRead) => {
        return (
          <>
            {statusRead ? (
              <Tag color="green" key={statusRead}>
                Đã đọc
              </Tag>
            ) : (
              <Tag color="red" key={statusRead}>
                Chưa đọc
              </Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/detail-cv/${record._id}`}>
            <Button
              icon={<EyeOutlined />}
              style={{ marginRight: "10px" }}
              color="cyan"
              variant="outlined"
            />
          </Link>
          <DeleteCV record={record} handleReload={handleReload} />
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"_id"}
        pagination={pagination}
        onChange={handleTableChange}
        className={className}
      />
    </>
  );
}

export default CVList;
