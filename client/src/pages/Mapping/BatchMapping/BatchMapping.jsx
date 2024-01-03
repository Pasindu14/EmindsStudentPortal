import React, { useEffect, useCallback, useRef } from "react";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../core/constants/styles";
import { SearchField } from "./components/Search";
import Card from "../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../components/AnimatedComponent";
import { useMappingStore } from "../../zustand/stores/mapping/mapping-zustand";
import { confirmToast } from "../../components/Toast";
import { addMappingModel } from "../../zustand/actions/master-actions";
import { AddMappingModel } from "./components/AddMappingModel";
import { useHandleErrors } from "../../hooks/useHandleErrors";

export const BatchMapping = () => {
  const addMappingModalRef = useRef(null);
  const {
    loading,
    statusMessage,
    hasErrors,
    getMappings, // Adjusted to getMappings
    addMapping, // Adjusted to addMapping
    updateMapping, // Adjusted to updateMapping
    filter,
    filteredMappingData, // Adjusted to filteredMappingData
    setSelectedMapping, // Adjusted to setSelectedMapping
    selectedMapping, // Adjusted to selectedMapping
    removeMapping, // Adjusted to removeMapping
    updateBlockingStatus,
    loadCourseBatchAndStudentData,
    // Any other relevant methods
  } = useMappingStore();

  useEffect(() => {
    getMappings();
    loadCourseBatchAndStudentData();
  }, [getMappings, loadCourseBatchAndStudentData]);

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => filter(event.target.value),
    [filter]
  );

  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeMapping(row.auto_id));
  };

  const handleOnClick = () => {
    addMappingModalRef.current.showModal();
  };

  const handleChangeEvent = (row) => {
    const formData = new FormData();
    formData.append("auto_id", row.auto_id);
    formData.append("block_status", row.block_status === 1 ? 0 : 1);
    updateBlockingStatus(formData);
  };

  const mappingColumns = [
    { name: "NIC", cell: (row) => row.nic },
    { name: "Name", cell: (row) => row.name },
    {
      name: "Course code",
      cell: (row) => row.course_code,
    },
    {
      name: "Course name",
      cell: (row) => row.course_name,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <input
              type="checkbox"
              className="toggle toggle-xs toggle-primary"
              checked={row.block_status === 1}
              onChange={() => handleChangeEvent(row)}
            />
            <button
              className="btn btn-error btn-xs rounded-none text-white font-inter ml-4"
              onClick={() => handleRemoveButtonClick(row)}
            >
              Remove
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <div className="w-screen h-[90vh] flex items-center justify-center">
          <ThreeCircles height="100" width="100" color="#570DF8" visible />
        </div>
      ) : (
        <AnimatedComponent>
          <Card title="MANAGE MAPPING STUDENTS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={handleOnClick}
              >
                Add new mapping
              </button>

              <SearchField handleFilter={handleFilter} />
              <AddMappingModel
                addMapping={addMapping}
                loading={loading}
                addMappingModalRef={addMappingModalRef}
              />
              <div className="table-border">
                <DataTable
                  columns={mappingColumns}
                  data={filteredMappingData}
                  progressPending={loading}
                  pagination
                  customStyles={reactTableStyles}
                />
              </div>
            </div>
          </Card>
        </AnimatedComponent>
      )}
    </>
  );
};
