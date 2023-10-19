import React, { useState } from "react";

export const CourseSelect = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option disabled value="">
        Who shot first?
      </option>
      <option value="Han Solo">Han Solo</option>
      <option value="Greedo">Greedo</option>
    </select>
  );
};
