import React from "react";
import { Select } from "antd";
import i18next from "../i18n";

type Props = {};

const Navbar = (props: Props) => {
  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
  };
  return (
    <>
      <div className="toprightbox">
        <Select
          defaultValue="EN"
          onChange={handleChange}
          options={[
            { value: "en", label: "EN" },
            { value: "th", label: "TH" },
          ]}
        />
      </div>
    </>
  );
};

export default Navbar;
