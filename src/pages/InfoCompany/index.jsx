/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Card, Col, Form, Input, message, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { editCompany } from "../../services/companyServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/auth.action";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm";
import { changePassword } from "../../services/authServices";
import { useTitle } from "../../hooks/useTitle";
const { TextArea } = Input;

function InfoCompany() {
  useTitle("Admin Detail - IT Job");
  const [info, setInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [resetPasswForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const company = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const fetchApi = async () => {
    setInfo(company);
    form.setFieldsValue(company);
  };
  useEffect(() => {
    fetchApi();
  }, [company]);
  const handleFinsh = async (values) => {
    try {
      const result = await editCompany(values);
      if (result) {
        messageApi.open({
          type: "success",
          content: "Cập nhật thông tin thành công",
        });
        dispatch(fetchUser());
        setIsEdit(false);
        fetchApi();
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
    }
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {
    setIsEdit(false);
  };
  const handleFinishChangePassword = async (values) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công",
      });
      
      resetPasswForm.resetFields();
      setOpen(false);
    } catch (err) {
      setOpen(true);
      messageApi.open({
        type: "error",
        content: err.response?.data?.message || "Không thể lấy thông tin",
      });
      
    }
    
  };
  return (
    <>
      {contextHolder}
      {info && (
        <>
          <Card
            title="Thông tin công ty"
            extra={
              isEdit ? (
                <>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setOpen(true)}
                    className="mr-10"
                  >
                    Đổi mật khẩu
                  </Button>
                  <Button color="danger" variant="outlined" onClick={handleCancel}>Hủy</Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit}>Chỉnh Sửa</Button>
                </>
              )
            }
          >
            <Form
              form={form}
              onFinish={handleFinsh}
              layout="vertical"
              disabled={!isEdit}
            >
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Form.Item
                    name="companyName"
                    label="Tên công ty"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên công ty" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="email"
                    label={"Email (dùng cho đăng nhập)"}
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="phone"
                    label={"Số điện thoại"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="address"
                    label={"Địa chỉ"}
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="quantityPeople" label={"Số lượng nhân sự"}>
                    <Input type="number" min={0} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="workingTime" label={"Thời gian làm việc"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="website" label={"Website"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label={"Mô tả công ty"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mô tả công ty",
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="detail" label={"Mô tả chi tiết"}>
                    <TextArea rows={12} />
                  </Form.Item>
                </Col>
                {isEdit && (
                  <Col span={24}>
                    <Form.Item label={null}>
                      <Button type="primary" htmlType="submit">
                        Cập nhập
                      </Button>
                      <Button className="ml-10" onClick={handleCancel}>
                        Hủy
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        <Modal
        onCancel={() => setOpen(false)}
        centered
        open={open}  
        footer={null}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <ChangePasswordForm form={resetPasswForm} onFinish={handleFinishChangePassword} />
      </Modal>
        </>
      )}
    </>
  );
}

export default InfoCompany;
