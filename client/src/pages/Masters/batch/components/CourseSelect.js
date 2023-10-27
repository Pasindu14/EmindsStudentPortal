import React from "react";
import { useBatchStore } from "../../../../zustand/stores/batches-zustand";
import { useField } from "formik";

export const CourseSelect = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { courseData } = useBatchStore();

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
        <option value="">Select a course</option>
        {courseData != null &&
          courseData.map(
            (
              course // Adjusted prop name
            ) => (
              <option key={course.auto_id} value={course.auto_id}>
                {course.course_code + " | " + course.course_name}
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
