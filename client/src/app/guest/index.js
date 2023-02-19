import React, { Fragment, useState } from "react";
import { Col, Row } from "antd";
import "../../assets/app.scss";
import Login from "./Pages/Login/index";
import Registration from "./Pages/Registration/index";
import { Passwords } from "./Pages";

const App = () => {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    console.log("clicked on handleLogout");
    setCurrentUsername(null);
    myStorage.removeItem("user");
    setShowRegister(false);
    setShowLogin(false);
  };

  console.log("currentUsername", currentUsername);
  console.log("showRegister", showRegister);
  console.log("showLogin", showLogin);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        // alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "50px auto",
        margin: "50px auto"
      }}
    >
      <div />
      {currentUsername ? (
        <Fragment>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="main-colored increased-size">Password Manager</div>
          </div>
          <Row gutter={24} style={{ width: "100%", marginTop: 30, marginLeft:0 }}>
            <Col span={6} />
            <Col span={12} className="vh-center">
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </Col>
            <Col span={6} />
          </Row>
          <Passwords />
        </Fragment>
      ) : (
        <Fragment>
          <Row gutter={24} style={{ width: "100%" }}>
            <Col span={12} className="vh-center">
              <button
                className="register-button"
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                REGISTER
              </button>
            </Col>
            <Col span={12} className="vh-center">
              <button
                className="login-button"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                LOGIN
              </button>
            </Col>
          </Row>
        </Fragment>
      )}

      {showRegister && <Registration setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setCurrentUsername={setCurrentUsername}
          myStorage={myStorage}
        />
      )}
    </div>
  );
};

export default App;
