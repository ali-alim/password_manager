import { Button, Form, Input, Modal, Table } from "antd";
import { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";

const Passwords = ({}) => {
  const [form] = Form.useForm();
  const [passwords, setPasswords] = useState([]);
  const addNewPasswordRef = useRef();
  const [showAddNewPasswordModal, setShowAddNewPasswordModal] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const allPasswords = await axios.get(
          process.env.REACT_APP_API_URL + "/passwords"
        );
        setPasswords(allPasswords.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!fetchCompleted) getPasswords();
    setFetchCompleted(true);
  }, [refreshData]);

  const handleSubmit = async (values) => {
    const data = {};
    data["website"] = values.website;
    data["email"] = values.email;
    data["password"] = values.password;
    data["category"] = values.category;

    try {
      await axios.post(process.env.REACT_APP_API_URL + "/passwords", data);
      setRefreshData(!refreshData);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {};

  const columns = [
    {
      title: "Website",
      // dataIndex: "website",
      render: (data) => <span style={{fontSize: 11}}>{data.website}</span>,
      sorter: (a, b) => a.website.length - b.website.length,
    },
    {
      title: "Email",
      // dataIndex: "email",
      render: (data) => <span style={{fontSize: 11}}>{data.email}</span>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Password",
      // dataIndex: "password",
      render: (data) => <span style={{fontSize: 11}}>{data.password}</span>

    },
  ];

  return (
    <Fragment>
      <div>
        <button
          className="add-password-button"
          onClick={() => setShowAddNewPasswordModal(true)}
        >
          Add new password
        </button>
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
          <Button
            ref={addNewPasswordRef}
            type="primary"
            htmlType="submit"
            style={{ display: "none" }}
          >
            Submit
          </Button>
        </Form>
      </Modal>
      <Table
        style={{ margin: "10px auto" }}
        columns={columns}
        dataSource={passwords}
        onChange={onChange}
      />
    </Fragment>
  );
};

export default Passwords;
