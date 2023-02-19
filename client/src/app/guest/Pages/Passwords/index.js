import { Button, Col, Form, Input, Modal, Row } from "antd";
import { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";

const Passwords = ({}) => {
  const [form] = Form.useForm();
  const [passwordsHidden, setPasswordsHidden] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const addNewPasswordRef = useRef();
  const [showAddNewPasswordModal, setShowAddNewPasswordModal] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const getPasswords = async () => {
        try{
            const allPasswords = await axios.get(process.env.REACT_APP_API_URL + "/passwords");
            setPasswords(allPasswords.data);
            console.log("passwords",passwords)
        } catch(err){
          console.log(err)
        }
    };
    if(!fetchCompleted) getPasswords();
    setFetchCompleted(true)
  },[refreshData])

  const handleSubmit = async (values) => {
      const data = {};
      data["website"] = values.website;
      data["email"] = values.email;
      data["password"] = values.password;
      data["category"] = values.category;

      try {
        await axios.post(process.env.REACT_APP_API_URL + "/passwords", data);
        setRefreshData(!refreshData)
      } catch (err) {
        console.log(err);
      }
    };


  return (
    <Fragment>
      <div>
        <button className="add-password-button" onClick={() => setShowAddNewPasswordModal(true)}>
          Add new password
        </button>
      </div>
        <div style={{paddingRight: 10}}>
        {passwords?.map((item,i) => (
          <Fragment>
            <Row gutter={24} style={{wordBreak:'break-all', fontSize:9, textAlign:'center', marginBottom: 3}} className="vh-center">
              <Col span={8} style={{border:'1px solid black'}}><div key={i}>{item.website}</div></Col>
              <Col span={8} style={{border:'1px solid black'}}><div key={i}>{item.email}</div></Col>
              <Col span={8} style={{border:'1px solid black'}}><div key={i}>{item.password}</div></Col>
            </Row>
          </Fragment>
        ))}
        </div>

      <Modal
        open={showAddNewPasswordModal}
        onCancel={() => setShowAddNewPasswordModal(false)}
        onOk={() => {
            addNewPasswordRef.current.click();
            setShowAddNewPasswordModal(false);
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label="WEBSITE"
              name="website"
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
            <Form.Item
              label="CATEGORY"
              name="category"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Button ref={addNewPasswordRef} type="primary" htmlType="submit" style={{display:'none'}}>
                Submit
                </Button>
              
          </Form>
      </Modal>
      {/* <Row gutter={24} style={{ marginTop: 10 }}>
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
      </Row> */}
    </Fragment>
  );
};

export default Passwords;
