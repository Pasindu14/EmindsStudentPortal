import React from "react";
import { useField } from "formik";

const CustomFileInput = ({ label, setFieldValue, ...props }) => {
  const [meta] = useField(props);

  console.log("meta", meta.error);
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text-alt">{label}</span>
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event) => {
            setFieldValue("file", event.currentTarget.files[0]);
          }}
          className={
            meta.touched && meta.error
              ? " file-input file-input-bordered file-input-primary w-full  rounded-none input-error"
              : "file-input file-input-bordered file-input-primary w-full  rounded-none"
          }
        />
        {meta.touched && meta.error && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default CustomFileInput;
