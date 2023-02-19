import { Button, Col, Form, Input, Row } from "antd";
import { Fragment, useState } from "react";
import axios from "axios";


const Registration = ({
  setShowRegister
}) => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    const data = {};
    data["name"] = values.name;
    data["password"] = values.password;
    data["email"] = values.email;

    try {
      // console.log("values",values)
      await axios.post(process.env.REACT_APP_API_URL + "/users/register", data);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Fragment>
      <Row gutter={24} style={{ marginTop: 10 }}>
        <Col span={2} />
        <Col span={20}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item label="NAME" name="name">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item
              label="EMAIL"
              name="email"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item
              label="PASSWORD"
              name="password"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Button
              className="submit-button"
              type="primary"
              htmlType="submit"
            >
              REGISTER
            </Button>
          </Form>
        </Col>
        <Col span={2} />
      </Row>
      {success && (
        <span className="success">Successfull. You can login now!</span>
      )}
      {error && <span className="failure">Something went wrong!</span>}
    </Fragment>
  );
};

export default Registration;
