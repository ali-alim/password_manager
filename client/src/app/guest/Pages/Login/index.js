import { Button, Col, Form, Input, Row } from "antd";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({
  setShowLogin,
  setCurrentUsername,
  myStorage
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    const data = {};
    data["password"] = values.password;
    data["email"] = values.email;

    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/users/login", data);
      setCurrentUsername(res.data.name);
      myStorage.setItem('user', res.data.name);
      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Fragment>
      <Row gutter={24} style={{ marginTop: 10 }}>
        <Col span={2} />
        <Col span={20}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
            <Link to="/forgot-password">
              <div
                style={{
                  textAlign: "center",
                  margin: "20px auto",
                  cursor: "pointer",
                }}
              >
                <span className="main-colored">Forgot Password?</span>
              </div>
            </Link>
            <Button className="submit-button" type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form>
        </Col>
        <Col span={2} />
      </Row>
      {error && <span className="failure">Something went wrong!</span>}
    </Fragment>
  );
};

export default Login;
