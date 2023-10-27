import React, { useEffect, useCallback, useRef } from "react";
import { useExamStore } from "../../../zustand/stores/exam-zustand"; // Adjust this import
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddExamModel } from "./components/AddExamModel";
import { UpdateExamModel } from "./components/UpdateExamModel";
import { SearchField } from "./components/Search";

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
    loadCourseAndBatchData,
    setSelectedCourseCode,
    setSelectedBatchCode,
  } = useExamStore();

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
    showUpdateModal();
    setSelectedExam(row);
  };

  const examColumns = [
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
              className="btn btn-primary btn-sm rounded-none text-white font-inter"
              onClick={() => handleUpdateButtonClick(row)}
            >
              Update
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
                addExam={addExam}
                loading={loading}
                addExamModalRef={addExamModalRef}
                setSelectedCourseCode={setSelectedCourseCode}
                setSelectedBatchCode={setSelectedBatchCode}
              />
              <UpdateExamModel
                updateExam={updateExam}
                loading={loading}
                selectedExam={selectedExam}
                updateExamModalRef={updateExamModalRef}
              />

              <SearchField handleFilter={handleFilter} />
              <div className="table-border">
                <DataTable
                  columns={examColumns}
                  data={filteredExamData}
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
