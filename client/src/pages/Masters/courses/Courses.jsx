import React, { useEffect, useCallback, useRef } from "react";
import { useCourseStore } from "../../../zustand/stores/courseZustand"; // Change to useCourseStore
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddCourseModal } from "./components/AddCourseModel"; // Change to AddCourseModal
import { UpdateCourseModel } from "./components/UpdateCourseModel"; // Change to UpdateCourseModel
import { SearchField } from "./components/Search";
import Card from "../../../components/Card";

export function Courses() {
  const addCourseModalRef = useRef(null); // Change to addCourseModalRef
  const updateCourseModalRef = useRef(null); // Change to updateCourseModalRef

  const showAddModal = () => {
    addCourseModalRef.current.showModal(); // Change to addCourseModalRef
  };

  const showUpdateModal = () => {
    updateCourseModalRef.current.showModal(); // Change to updateCourseModalRef
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getCourses, // Change to getCourses
    addCourse, // Change to addCourse
    updateCourse, // Change to updateCourse
    filter,
    filteredCourseData, // Change to filteredCourseData
    setSelectedCourse, // Change to setSelectedCourse
    selectedCourse, // Change to selectedCourse
  } = useCourseStore(); // Change to useCourseStore

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getCourses(); // Change to getCourses
  }, [getCourses]); // Change to getCourses

  const handleAddButtonClick = (row) => {
    showUpdateModal();
    setSelectedCourse(row); // Change to setSelectedCourse
  };

  const courseColumns = [
    {
      name: "Course Code",
      cell: (row) => row.course_code,
    },
    {
      name: "Course Name",
      cell: (row) => row.course_name,
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm rounded-none text-white font-inter"
              onClick={() => handleAddButtonClick(row)}
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
      <Card title="MANAGE STUDENTS">
        <div className="font-inter">
          <button
            className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
            type="submit"
            onClick={() => showAddModal()}
          >
            Add new course
          </button>

          <AddCourseModal // Change to AddCourseModal
            addCourse={addCourse} // Change to addCourse
            loading={loading}
            addCourseModalRef={addCourseModalRef} // Change to addCourseModalRef
          />
          <UpdateCourseModel // Change to UpdateCourseModel
            updateCourse={updateCourse} // Change to updateCourse
            loading={loading}
            selectedCourse={selectedCourse} // Change to selectedCourse
            updateCourseModalRef={updateCourseModalRef} // Change to updateCourseModalRef
          />

          <SearchField handleFilter={handleFilter} />

          <div className="table-border">
            <DataTable
              columns={courseColumns} // Change to courseColumns
              data={filteredCourseData} // Change to filteredCourseData
              progressPending={loading}
              pagination
              customStyles={reactTableStyles}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
