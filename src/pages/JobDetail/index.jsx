/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Tag,
} from "antd";
import {
  DollarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ToolOutlined,
  GlobalOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { BsSendCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobServices";
import { getDetailCompany } from "../../services/companyServices";
import Goback from "../../components/Goback";
import { createCV } from "../../services/cvServices";
import "./JobDetail.scss";
import { useTitle } from "../../hooks/useTitle";

const { TextArea } = Input;

function JobDetail() {
  useTitle("Detail Job - IT Job");
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState();
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const rules = [{ required: true, message: "Bắt buộc nhập!" }];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getDetailJob(id);
        const infoCompany = await getDetailCompany(result.idCompany);
        setJobDetail({
          ...result,
          createdAt: new Date(result.createdAt).toLocaleString(),
          updatedAt: new Date(result.updatedAt).toLocaleString(),
          infoCompany,
        });
      } catch (err) {
        messageApi.error(
          err.response?.data?.message || "Không thể lấy thông tin"
        );
      }
    };
    fetchApi();
  }, []);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        idJob: jobDetail._id,
        idCompany: jobDetail.infoCompany._id,
        statusRead: false,
      };
      const result = await createCV(payload);
      if (result) {
        form.resetFields();
        noti.success({
          message: "Tạo CV thành công",
          description: "Nhà tuyển dụng sẽ liên hệ bạn sớm nhất.",
        });
      } else {
        noti.error({
          message: "Lỗi hệ thống",
          description: "Vui lòng thử lại sau.",
        });
      }
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Gửi thất bại");
    }
  };

  return (
    <div className="job-detail">
      {contextHolder}
      {contextHolderMessage}
      <Goback />

      {jobDetail && (
        <>
          <div className="job-detail__header">
            <h1 className="job-detail__title">{jobDetail.name}</h1>
            <Button icon={<BsSendCheck />} type="primary" href="#formApply" size="large">
              Ứng tuyển ngay
            </Button>
          </div>

          <div className="job-detail__info">
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className="job-detail__item">
                  <span>
                    <DollarOutlined /> Mức lương:
                  </span>
                  <strong>{jobDetail.salary}</strong>
                </div>
                <div className="job-detail__item">
                  <span>
                    <CalendarOutlined /> Ngày đăng:
                  </span>
                  <strong>{jobDetail.createdAt}</strong>
                </div>
                <div className="job-detail__item job-detail__item--tags">
                  <span>
                    <ToolOutlined /> Kỹ năng:
                  </span>
                  <div className="job-detail__tags">
                    {jobDetail.tags?.map((tag, i) => (
                      <Tag key={i} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div className="job-detail__item">
                  <span>
                    <EnvironmentOutlined /> Địa chỉ công ty:
                  </span>
                  <strong>{jobDetail.infoCompany?.address}</strong>
                </div>
                <div className="job-detail__item">
                  <span>
                    <GlobalOutlined /> Thành phố:
                  </span>
                  <div className="job-detail__cities">
                    {jobDetail.city?.map((city, i) => (
                      <Tag key={i} color="orange">
                        {city}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="job-detail__description">
            <h2>
              <FileTextOutlined className="job-detail__icon" /> Mô tả công việc
            </h2>
            <p>{jobDetail.description}</p>
          </div>

          <div className="job-detail__company">
            <h2>
              <BankOutlined className="job-detail__icon" /> Giới thiệu công ty
            </h2>
            <p>{jobDetail.infoCompany?.description}</p>
          </div>

          <Card
            id="formApply"
            className="job-detail__form"
            title="Nộp đơn ứng tuyển"
          >
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Họ tên" name="name" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Select>
                      {jobDetail.city.map((c, i) => (
                        <Select.Option key={i} value={c}>
                          {c}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Link các dự án đã làm"
                    name="linkProject"
                    rules={rules}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Gửi yêu cầu
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </div>
  );
}

export default JobDetail;
