import React from "react";
import { useMappingStore } from "../../../zustand/stores/mapping/mapping-zustand";
import { useField } from "formik";

export const BatchSelect = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { batchData } = useMappingStore();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text-alt">{props.label}</span>
      </label>
      <select
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "select select-bordered w-full rounded-none select-error"
            : "select select-bordered select-primary w-full rounded-none"
        }
      >
        <option value="">Select a batch</option>
        {batchData != null &&
          batchData.map(
            (
              batch // Adjusted prop name
            ) => (
              <option key={batch.auto_id} value={batch.auto_id}>
                {batch.batch_no + " | " + batch.batch_name}
              </option>
            )
          )}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
