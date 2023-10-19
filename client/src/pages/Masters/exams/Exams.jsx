import React, { useEffect, useCallback, useRef } from "react";
import { useExamStore } from "../../../zustand/stores/examZustand"; // Adjust this import
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { confirmToast } from "../../../components/Toast";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddExamModel } from "./components/AddExamModel";
import { UpdateExamModel } from "./components/UpdateExamModel";
import { SearchField } from "./components/Search";
import { CourseSelect } from "./components/CourseSelect";
import Card from "../../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";

export function Exams() {
  const addExamModalRef = useRef(null);
  const updateExamModalRef = useRef(null);

  const showAddModal = () => {
    addExamModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateExamModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getExams,
    addExam,
    updateExam,
    filter,
    filteredExamData,
    setSelectedExam,
    selectedExam,
    removeExam,
    loadCourseAndBatchData,
    batchData,
    coursedata,
  } = useExamStore(); // Adjusted store hook

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getExams();
    loadCourseAndBatchData();
  }, [getExams, loadCourseAndBatchData]);

  const handleUpdateButtonClick = (row) => {
    console.log(row);
    showUpdateModal();
    setSelectedExam(row);
  };

  const courseSelect = () => {
    return (
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Who shot first?
        </option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
    );
  };
  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeExam(row.exam_auto_id)); // Adjusted to exam_auto_id
  };

  const examColumns = [
    // Adjusted columns to reflect exam data
    {
      name: "Exam Code",
      cell: (row) => row.exam_code,
    },
    {
      name: "Course",
      cell: (row) => row.course_name,
    },
    {
      name: "Batch",
      cell: (row) => row.batch_name,
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-success btn-sm rounded-none text-white font-inter"
              onClick={() => handleUpdateButtonClick(row)}
            >
              Update
            </button>
            <button
              className="btn btn-error btn-sm rounded-none text-white font-inter"
              onClick={() => handleRemoveButtonClick(row)}
            >
              Remove
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading === true ? (
        <div className="w-screen h-[90vh] flex items-center justify-center">
          <ThreeCircles
            height="100"
            width="100"
            color="#570DF8"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : (
        <AnimatedComponent>
          <Card title="MANAGE EXAMS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new exam
              </button>

              <AddExamModel
                addExam={addExam} // Adjusted prop names and values
                loading={loading}
                addExamModalRef={addExamModalRef} // Adjusted ref name
              />
              <UpdateExamModel
                updateExam={updateExam} // Adjusted prop names and values
                loading={loading}
                selectedExam={selectedExam} // Adjusted prop name
                updateExamModalRef={updateExamModalRef} // Adjusted ref name
              />
              <CourseSelect />
              <SearchField handleFilter={handleFilter} />
              <div className="table-border">
                <DataTable
                  columns={examColumns} // Adjusted columns prop value
                  data={filteredExamData} // Adjusted data prop value
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
}
