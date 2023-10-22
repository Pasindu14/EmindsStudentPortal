import React from "react";
import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            checked="checked"
            className="checkbox checkbox-primary rounded-none mt-4"
            {...field}
            {...props}
          />
        </label>
      </div>
    </>
  );
};

export default CustomInput;
