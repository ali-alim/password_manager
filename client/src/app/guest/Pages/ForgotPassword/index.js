import { Button, Col, Form, Input, Row } from "antd";
import { Fragment, useState } from "react";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={2} />
        <Col>
          <div>
            <span style={{ fontSize: 42, color: "#545974" }}>FORGOT <br /> PASSWORD</span>
          </div>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 80 }}>
        <Col span={2} />
        <Col span={20}>
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              if(values){
                setIsSubmitted(true);
              }
            }}
          >
            {isSubmitted ? (
              <div style={{marginBottom: 20}}>
                <span style={{color: '#BABABA'}}>
                  The link to reset your password has been sent to your email. Check your email to reset your password.
                </span>
              </div>
            ) : (<Form.Item
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
            </Form.Item>)}
            <Button className="submit-button" type="primary" htmlType="submit">
              {isSubmitted ? "RESEND" : "SUBMIT"}
            </Button>
          </Form>
        </Col>
        <Col span={2} />
      </Row>
    </Fragment>
  );
};

export default ForgotPassword;
