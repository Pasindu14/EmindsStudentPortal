import React from "react";
import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text-alt">{label}</span>
        </label>
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? " input input-bordered rounded-none input-error"
              : "input input-bordered input-primary rounded-none"
          }
        />
        {meta.touched && meta.error && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default CustomInput;
