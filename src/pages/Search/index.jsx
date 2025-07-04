import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobServices";
import { Tag, Pagination, message } from "antd";
import SearchList from "../../components/SearchForm/SearchList";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  
  const [messageApi, contextHolder] = message.useMessage();

  const citySearch = searchParams.get("city") || "";
  const keyWordSearch = searchParams.get("keyword") || "";
  // Khối pagination
  const [currentPageData, setCurrentPageData] = useState([]);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 9;

  // Lấy danh sách job, lọc theo keyword và city
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAllJob();
        if (result) {
          const filtered = result.filter((item) => {
            const cityMatch = citySearch
              ? String(item.city || "")
                  .toLowerCase()
                  .includes(citySearch.toLowerCase())
              : true;
            const keyWordMatch = keyWordSearch
              ? item.tags?.some((tag) =>
                  tag.toLowerCase().includes(keyWordSearch.toLowerCase())
                )
              : true;
            const isActive = item.status;
            return cityMatch && keyWordMatch && isActive;
          });
          const reversed = filtered.reverse();
          setData(reversed);
        }
      } catch (err) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message || "Không thể lấy thông tin",
        });
      }
    };
    fetchApi();
  }, [citySearch, keyWordSearch, messageApi]);

  // Chia phân trang
  useEffect(() => {
    if (Array.isArray(data)) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setCurrentPageData(data.slice(start, end));
    }
  }, [data, page]);

  // Khi đổi page → cập nhật URL param
  const handlePageChange = (newPage) => {
    setSearchParams({
      city: citySearch,
      keyword: keyWordSearch,
      page: newPage,
    });
     //  Scroll lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth", // cuộn mượt
  });
  };

  return (
    <>
      {contextHolder}
      <div className="mb-20">
        <strong>Kết quả tìm kiếm: </strong>
        {citySearch && <Tag>{citySearch}</Tag>}
        {keyWordSearch && <Tag>{keyWordSearch}</Tag>}
      </div>

      {currentPageData.length > 0 ? (
        <>
          <SearchList data={currentPageData} />
          <div className="mt-20" style={{ textAlign: "center" }}>
            <Pagination
              align="center"
              current={page}
              pageSize={pageSize}
              total={data.length}
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

export default Search;
