import React from "react";
import { useMappingStore } from "../../../zustand/stores/mapping/mappingZustand";
import { useField } from "formik";
import Select from "react-select";

export const StudentMultiSelect = ({ setFieldValue, ...props }) => {
  const [field, meta] = useField(props);
  const { studentData } = useMappingStore();

  const colourStyles = {
    menuList: (styles) => ({
      ...styles,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#8F5CFF" : isSelected ? "#8F5CFF" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "1px solid #8F5CFF !important",
      // This line disable the blue border
      boxShadow: "2px solid #8F5CFF !important",
      "&:hover": {
        border: "2px solid #8F5CFF !important",
      },
      borderRadius: 0,
    }),
  };

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text-alt">{props.label}</span>
        </label>
        <Select
          isMulti
          name="colors"
          options={
            studentData != null
              ? studentData.map((student) => ({
                  value: student.auto_id,
                  label: student.name,
                }))
              : []
          }
          className="basic-multi-select"
          classNamePrefix="select"
          styles={colourStyles}
          onChange={(selected) => setFieldValue("students", selected)}
        />

        {meta.touched && meta.error && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </>
  );
};
