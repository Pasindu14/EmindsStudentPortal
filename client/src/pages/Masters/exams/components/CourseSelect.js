import React, { useState } from "react";
import { useExamStore } from "../../../../zustand/stores/examZustand";

export const CourseSelect = ({ setSelectedCourseCode }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { courseData } = useExamStore();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedCourseCode(event.target.value);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text-alt">Course</span>
      </label>
      <select
        className="select select-bordered select-primary w-full rounded-none"
        value={selectedOption}
        onChange={handleSelectChange}
      >
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
    </div>
  );
};
