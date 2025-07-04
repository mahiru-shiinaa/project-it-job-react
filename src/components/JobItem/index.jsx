import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function JobItem(props) {
  const { item = {}, className="" } = props;
  item.createdAt = new Date(item.createdAt).toLocaleString();
  return (
    <>
      <Card
      style={{height: "100%"}}
        title={<Link to={`/jobs/info/${item._id}`}>{item.name}</Link>}
        size="small"
        className={className}

      >
        <div className="mb-10">
          <span>Ngôn ngữ: </span>
          {item.tags.map((item, index) => (
            <Tag color="blue" className="mb-5" key={index}>
              {item}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
          <span>Thành phố: </span>
          {item.city.map((item, index) => (
            <Tag color="orange" className="mb-5" key={index}>
              {item}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
          <span>Lương: </span>
          <strong>{item.salary}</strong>
        </div>
        <div className="mb-10">
          Công ty: <strong>{item?.infoCompany?.companyName}</strong>
        </div>
        <div className="mb-10">
          Ngày tạo: <strong>{item.createdAt}</strong>
        </div>
      </Card>
    </>
  );
}

export default JobItem;
