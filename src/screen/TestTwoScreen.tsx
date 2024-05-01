import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Radio,
  Row,
  Select,
  Table,
  TableProps,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./TestTwoScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, edit, changeStatus } from "../store/userSlice";
import dayjs from "dayjs";

type Props = {};
interface DataType {
  key: number;
  name: string;
  gender: string;
  tel: string;
  nationality: string;
}

const TestTwoScreen = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { userStore } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "name",
      title: <>{t("Name")}</>,
      dataIndex: "name",
    },
    {
      key: "gender",
      title: <>{t("Gender")}</>,
      dataIndex: "gender",
    },
    {
      key: "tel",
      title: <>{t("Phone Number")}</>,
      dataIndex: "tel",
    },
    {
      key: "nationality",
      title: <>{t("Nationality")}</>,
      dataIndex: "nationality",
    },
    {
      key: "manage",
      title: <>{t("Action")}</>,
      dataIndex: "manage",
      render: (_: any, record: any) => {
        return (
          <>
            <Typography.Link onClick={() => handleEdit(record)}>
              Edit
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const initialEditData = {
    key: userStore.editRow.key
      ? userStore.editRow.key
      : userStore.user.length + 1,
    prefix: userStore.editRow.prefix ? userStore.editRow.prefix : "",
    firstName: userStore.editRow.firstName ? userStore.editRow.firstName : "",
    surName: userStore.editRow.surName ? userStore.editRow.surName : "",
    birthDate: userStore.editRow.birthDate
      ? dayjs(userStore.editRow.birthDate)
      : "",
    nationality: userStore.editRow.nationality
      ? userStore.editRow.nationality
      : "",
    idCard1: userStore.editRow.idCard1 ? userStore.editRow.idCard1 : "",
    idCard2: userStore.editRow.idCard2 ? userStore.editRow.idCard2 : "",
    idCard3: userStore.editRow.idCard3 ? userStore.editRow.idCard3 : "",
    idCard4: userStore.editRow.idCard4 ? userStore.editRow.idCard4 : "",
    idCard5: userStore.editRow.idCard5 ? userStore.editRow.idCard5 : "",
    gender: userStore.editRow.gender ? userStore.editRow.gender : "",
    prefixTel: userStore.editRow.prefixTel ? userStore.editRow.prefixTel : "",
    telNumber: userStore.editRow.telNumber ? userStore.editRow.telNumber : "",
    passport: userStore.editRow.passport ? userStore.editRow.passport : "",
    salary: userStore.editRow.salary ? userStore.editRow.salary : "",
  };

  let dataTable: DataType[] = [];

  useEffect(() => {
    form.setFieldsValue(initialEditData);
  }, [form, initialEditData]);

  const handleEdit = (record: any) => {
    let userData = getLocalStoreData();
    let newData = userData.find((item: any) => {
      return record.key === item.key;
    });
    dispatch(edit(newData));
  };
  const getLocalStoreData = () => {
    let user: any = localStorage.getItem("userData");
    let userData = JSON.parse(user);
    return userData;
  };

  const getTable = () => {
    let userData = getLocalStoreData();
    if (userData) {
      let dataTable = userData.map((e: any, idx: any) => {
        return {
          key: idx + 1,
          name: e.prefix + " " + e.firstName + " " + e.surName,
          gender: e.gender,
          tel: e.prefixTel + "-" + e.telNumber,
          nationality: e.nationality,
        };
      });
      dispatch(add(dataTable));
    }
  };
  useEffect(() => {
    getTable();
  }, []);

  const handleRemove = () => {
    let userData = getLocalStoreData();
    const removeKey = userStore.selectRow.map((e: any) => {
      return e.key;
    });

    let newData = userStore.user.filter(
      (item: any) => !removeKey.includes(item.key)
    );

    let localStoreNewData = userData.filter(
      (item: any) => !removeKey.includes(item.key)
    );

    dispatch(add(newData));
    localStorage.setItem("userData", JSON.stringify(localStoreNewData));
  };

  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

  const onFinish: FormProps["onFinish"] = (value) => {
    let userData = getLocalStoreData();
    let userDataStore = userData ? [...userData] : [];
    if (userStore.status === "edit" && userStore.editRow) {
      let newData = userDataStore.filter(
        (item: any) => userStore.editRow.key !== item.key
      );
      newData.push(value);
      localStorage.setItem("userData", JSON.stringify(newData));
      getTable();
      dispatch(edit({}));
      dispatch(changeStatus("add"));
      onReset();
    } else {
      if (userData && userData.length !== 0) {
        let newData = [...userData, value];
        localStorage.setItem("userData", JSON.stringify(newData));

        getTable();
      } else {
        dataTable.push(value);
        localStorage.setItem("userData", JSON.stringify(dataTable));
        getTable();
      }

      onReset();
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(remove(selectedRows));
    },
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Form
        form={form}
        name="basicForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="screenbox">
          <Row justify="space-between" align="middle">
            <h1>{t("Manage Form")}</h1>
            <Button
              onClick={() => {
                navigate("/");
                dispatch(edit({}));
                dispatch(changeStatus("add"));
                onReset();
              }}
            >
              {t("Back")}
            </Button>
          </Row>
          <div className="formcontainer">
            <div className="formbox">
              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>
                    <span className="redfont">*</span> {t("Prefix")} :
                  </p>
                </Col>
                <Form.Item name="key">
                  <Input style={{ display: "none" }} />
                </Form.Item>
                <Col span={3}>
                  <Form.Item
                    initialValue={userStore.editRow.prefix}
                    name="prefix"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Prefix!",
                      },
                    ]}
                  >
                    <Select
                      placeholder={t("Prefix")}
                      style={{ width: "100%" }}
                      options={[
                        { value: "นาย", label: "นาย" },
                        { value: "นางสาว", label: "นางสาว" },
                        { value: "นาง", label: "นาง" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <p>
                    <span className="redfont">*</span> {t("Firstname")} :
                  </p>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Firstname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  {" "}
                  <p>
                    <span className="redfont">*</span> {t("Surname")} :
                  </p>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name="surName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Surname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>
                    <span className="redfont">*</span> {t("Birthday")} :
                  </p>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="birthDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Birthdate!",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder={t("MM/DD/YYYY")}
                      format={"MM/DD/YYYY"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <p>
                    <span className="redfont">*</span> {t("Nationality")} :
                  </p>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="nationality"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Nationality!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="- - กรุณาเลือก - -"
                      style={{ width: "100%" }}
                      options={[
                        { value: "ไทย", label: "ไทย" },
                        { value: "อเมริกา", label: "อเมริกา" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>

              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>{t("ID Card")} :</p>
                </Col>
                <Col span={2}>
                  <Form.Item name="idCard1">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={0.5}>
                  <p style={{ display: "flex", justifyContent: "center" }}>-</p>
                </Col>
                <Col span={4}>
                  <Form.Item name="idCard2">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={0.5}>
                  <p style={{ display: "flex", justifyContent: "center" }}>-</p>
                </Col>
                <Col span={4}>
                  <Form.Item name="idCard3">
                    <Input />
                  </Form.Item>
                </Col>{" "}
                <Col span={0.5}>
                  <p style={{ display: "flex", justifyContent: "center" }}>-</p>
                </Col>
                <Col span={3}>
                  <Form.Item name="idCard4">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={0.5}>
                  <p style={{ display: "flex", justifyContent: "center" }}>-</p>
                </Col>
                <Col span={2}>
                  <Form.Item name="idCard5">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>
                    <span className="redfont">*</span> {t("Gender")} :
                  </p>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Gender!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={"ผู้ชาย"}>ผู้ชาย</Radio>
                      <Radio value={"ผู้หญิง"}>ผู้หญิง</Radio>
                      <Radio value={"ไม่ระบุ"}>ไม่ระบุ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>
                    <span className="redfont">*</span> {t("Phone Number")} :
                  </p>
                </Col>
                <Col span={3}>
                  <Form.Item
                    name="prefixTel"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Prefix Telephone!",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      options={[
                        { value: "086", label: "086" },
                        { value: "093", label: "093" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={0.5}>
                  <p style={{ display: "flex", justifyContent: "center" }}>-</p>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="telNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Telephone Number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>{t("Passport")} :</p>
                </Col>
                <Col span={6}>
                  <Form.Item name="passport">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"start"} align={"middle"} gutter={8}>
                <Col span={3}>
                  <p>
                    <span className="redfont">*</span> {t("Salary")} :
                  </p>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="salary"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Salary!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}></Col>
                <Col span={2}>
                  <Button htmlType="reset">{t("Clear")}</Button>
                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                  <Button htmlType="submit">{t("Save Data")}</Button>
                </Col>
              </Row>
            </div>
          </div>
          <Row
            align={"middle"}
            justify={"start"}
            style={{ margin: "0px 20px 20px 20px" }}
          >
            {/* <Checkbox>เลือกทั้งหมด</Checkbox> */}
            <Button onClick={handleRemove}>{t("Delete")}</Button>
          </Row>
          <div style={{ margin: "20px" }}>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              pagination={{ position: ["bottomCenter"] }}
              columns={columns}
              dataSource={userStore.user}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default TestTwoScreen;
