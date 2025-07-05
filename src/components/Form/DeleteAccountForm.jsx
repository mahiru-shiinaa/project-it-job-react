import { Button, Col, Form, Row, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import deleteIcon from "../../assets/images/delete.png"; // ⚠️ Đổi đúng path ảnh của bạn
import "./Form.scss";

const { Title, Text } = Typography;

function DeleteAccountForm({ onDelete, onCancel }) {
  return (
    
      <div className="card-delete-account">
        <Row justify={"center"}>
          <Col span={24}>
            <div className="card-delete-account__icon">
              <img src={deleteIcon} alt="delete" />
            </div>
          </Col>
          <Col span={24}>
            <div className="card-delete-account__title">
              <Title level={3}>Xóa tài khoản?</Title>
              <Text>Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa tài khoản không?</Text>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form layout="vertical" style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
                <Form.Item>
                  <Button size="large" onClick={onCancel} style={{ marginRight: 16 }}>
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    danger
                    size="large"
                    icon={<ExclamationCircleOutlined />}
                    onClick={onDelete}
                  >
                    Xác nhận xóa
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
  );
}

export default DeleteAccountForm;
