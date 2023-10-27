import React, { useEffect, useCallback, useRef } from "react";
import { useQuestionStore } from "../../../zustand/stores/question-zustand"; // Adjust this import
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { confirmToast } from "../../../components/Toast";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { SearchField } from "./components/Search";
import Card from "../../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";
import { AddQuestionModel } from "./components/AddQuestionModel";
import { UpdateQuestionModel } from "./components/UpdateQuestionModel";

export function Questions() {
  const addQuestionModalRef = useRef(null);
  const updateQuestionModalRef = useRef(null);

  const showAddModal = () => {
    addQuestionModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateQuestionModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getQuestions,
    addQuestion,
    updateQuestion,
    filter,
    filteredQuestionData,
    setSelectedQuestion,
    selectedQuestion,
    removeQuestion,
    loadCourseAndBatchAndExamData,
  } = useQuestionStore(); // Adjusted store hook

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getQuestions();
    loadCourseAndBatchAndExamData();
  }, [getQuestions, loadCourseAndBatchAndExamData]);

  const handleUpdateButtonClick = (row) => {
    showUpdateModal();
    setSelectedQuestion(row);
  };

  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeQuestion(row.exam_auto_id));
  };

  const questionColumns = [
    {
      name: "Course",
      cell: (row) => row.course_name,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Batch",
      cell: (row) => row.batch_name,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Exam",
      cell: (row) => row.exam_name,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Question",
      cell: (row) => row.question,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Answer 1",
      cell: (row) => row.answer_01,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Answer 2",
      cell: (row) => row.answer_02,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Answer 3",
      cell: (row) => row.answer_03,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Answer 4",
      cell: (row) => row.answer_04,
      minWidth: "10rem",
      grow: 1,
    },
    {
      name: "Correct \n Answer",
      cell: (row) => row.correct_answer,
      minWidth: "15rem",
      grow: 1,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary btn-sm rounded-none text-white font-inter"
            onClick={() => handleUpdateButtonClick(row)}
          >
            Update
          </button>
          <button
            className="btn btn-error btn-sm rounded-none text-white font-inter ml-2"
            onClick={() => handleRemoveButtonClick(row)}
          >
            Remove
          </button>
        </div>
      ),
      minWidth: "15rem",
      grow: 1,
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
          <Card title="MANAGE QUESTIONS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new question
              </button>
              <AddQuestionModel
                addQuestion={addQuestion} // Adjusted prop names and values
                loading={loading}
                addQuestionModalRef={addQuestionModalRef}
                // Adjusted ref name
              />
              <UpdateQuestionModel
                updateQuestion={updateQuestion} // Adjusted prop names and values
                loading={loading}
                selectedQuestion={selectedQuestion} // Adjusted prop name
                updateQuestionModalRef={updateQuestionModalRef} // Adjusted ref name
              />
              <SearchField handleFilter={handleFilter} />
              <div className="table-border">
                <DataTable
                  columns={questionColumns} // Adjusted columns prop value
                  data={filteredQuestionData} // Adjusted data prop value
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
