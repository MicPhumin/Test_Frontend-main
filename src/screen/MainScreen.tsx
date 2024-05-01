import { Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";
import { useTranslation } from "react-i18next";
type Props = {};

const MainScreen = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="mainbox">
        <Row gutter={8}>
          <Col>
            <Button className="mainbutton" onClick={() => navigate("/Test1")}>
              <p>{t("Test")} 1</p>
              <p>{t("Layout & Style")}</p>
            </Button>
          </Col>
          <Col>
            <Button className="mainbutton" onClick={() => navigate("/Test2")}>
              <p>{t("Test")} 2</p>
              <p>{t("Manage Form")}</p>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MainScreen;
