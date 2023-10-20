import React, { useState } from "react";
import { useExamStore } from "../../../../zustand/stores/examZustand";

export const BatchSelect = ({ setSelectedBatchCode }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { batchData } = useExamStore();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedBatchCode(event.target.value);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text-alt">Batch</span>
      </label>
      <select
        className="select select-bordered select-primary w-full rounded-none"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {batchData != null &&
          batchData.map(
            (
              batch // Adjusted prop name
            ) => (
              <option key={batchData.auto_id} value={batchData.auto_id}>
                {batch.batch_no + " | " + batch.batch_name}
              </option>
            )
          )}
      </select>
    </div>
  );
};
