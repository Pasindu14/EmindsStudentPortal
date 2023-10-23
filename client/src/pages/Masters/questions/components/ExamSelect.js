import React from "react";
import { useQuestionStore } from "../../../../zustand/stores/questionZustand";
import { useField } from "formik";

export const ExamSelect = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { examData } = useQuestionStore();

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
        <option value="">Select a exam</option>
        {examData != null &&
          examData.map(
            (
              exam // Adjusted prop name
            ) => (
              <option key={exam.exam_auto_id} value={exam.exam_auto_id}>
                {exam.exam_code}
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
