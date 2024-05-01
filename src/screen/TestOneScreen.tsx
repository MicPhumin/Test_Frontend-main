import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./TestOneScreen.css";
type Props = {};

const TestOneScreen = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shapeArr, setShapeArr] = useState<string[]>([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const rotateLeft = () => {
    const rotatedShapes = [...shapeArr];
    const firstShape = rotatedShapes.shift();
    if (firstShape) {
      rotatedShapes.push(firstShape);
    }
    setShapeArr(rotatedShapes);
  };

  const rotateRight = () => {
    const rotatedShapes = [...shapeArr];
    const lastShape = rotatedShapes.pop();
    if (lastShape) {
      rotatedShapes.unshift(lastShape);
    }
    setShapeArr(rotatedShapes);
  };

  const swapPosition = () => {
    const copyShapes = [...shapeArr];
    const getLayout = copyShapes.splice(3);
    let newArr = [...getLayout, ...copyShapes];
    setShapeArr(newArr);
  };

  const shuffle = () => {
    let copyArr = [...shapeArr];
    let newArr = copyArr.sort((a, b) => Math.random() - 0.5);
    setShapeArr(newArr);
  };

  return (
    <>
      <div className="screenbox">
        <Row justify="space-between" align="middle">
          <h1>{t("Layout & Style")}</h1>
          <Button onClick={() => navigate("/")}>{t("Back")}</Button>
        </Row>
        <Row justify="center" gutter={16}>
          <Col>
            <div className="badgecontainer">
              <Button className="shapebutton" onClick={rotateLeft}>
                <div className="left"></div>
              </Button>
              <span className="badge">{t("Move Shape")}</span>
            </div>
          </Col>
          <Col>
            <div className="badgecontainer">
              <Button className="positionbutton" onClick={swapPosition}>
                <Row>
                  <Col span={12}>
                    <div className="top"></div>
                  </Col>
                  <Col span={12}>
                    <div className="bottom"></div>
                  </Col>
                </Row>
              </Button>
              <span className="badge">{t("Move Position")}</span>
            </div>
          </Col>
          <Col>
            <div className="badgecontainer">
              <Button className="shapebutton" onClick={rotateRight}>
                <div className="right"></div>
              </Button>
              <span className="badge">{t("Move Shape")}</span>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <div
            style={{
              width: "1000px",
              display: "flex",
              flexFlow: "wrap",
              margin: "40px",
            }}
          >
            <Col span={4}></Col>
            {shapeArr &&
              shapeArr.map((item: string) => {
                return (
                  <>
                    <Col span={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "10px",
                        }}
                      >
                        <Button className="shapebutton" onClick={shuffle}>
                          <div key={item} className={item}></div>
                        </Button>
                      </div>
                    </Col>
                  </>
                );
              })}
          </div>
        </Row>
      </div>
    </>
  );
};

export default TestOneScreen;
