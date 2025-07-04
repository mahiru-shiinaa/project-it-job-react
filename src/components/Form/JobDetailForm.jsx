import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
const { TextArea } = Input;

function JobDetailForm(props) {
  const { form, onFinish, tags, city, actionText } = props;
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          status: true, // 👉 Mặc định bật
        }}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Tên job"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="tags"
              label="Tags"
              rules={[{ required: true, message: "Vui lòng chọn tags" }]}
            >
              <Select mode="multiple" allowClear options={tags} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="salary"
              label="Lương"
              rules={[{ required: true, message: "Vui lòng nhập lương" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Vùi lòng chọn city" }]}
            >
              <Select mode="multiple" allowClear options={city} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={6} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={"status"}
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch
                defaultChecked
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {actionText}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default JobDetailForm;
