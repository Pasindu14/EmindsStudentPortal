import React, { useEffect, useCallback, useRef } from "react";
import { useCourseStore } from "../../../zustand/stores/course-zustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddCourseModal } from "./components/AddCourseModel";
import { UpdateCourseModel } from "./components/UpdateCourseModel";
import { SearchField } from "./components/Search";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";
import Card from "../../../components/Card";

export function Courses() {
  const addCourseModalRef = useRef(null);
  const updateCourseModalRef = useRef(null);

  const showAddModal = () => {
    addCourseModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateCourseModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getCourses,
    addCourse,
    updateCourse,
    filter,
    filteredCourseData,
    setSelectedCourse,
    selectedCourse,
  } = useCourseStore();

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const handleAddButtonClick = (row) => {
    showUpdateModal();
    setSelectedCourse(row);
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
          <Card title="MANAGE STUDENTS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new course
              </button>

              <AddCourseModal
                addCourse={addCourse}
                loading={loading}
                addCourseModalRef={addCourseModalRef}
              />
              <UpdateCourseModel
                updateCourse={updateCourse}
                loading={loading}
                selectedCourse={selectedCourse}
                updateCourseModalRef={updateCourseModalRef}
              />

              <SearchField handleFilter={handleFilter} />

              <div className="table-border">
                <DataTable
                  columns={courseColumns}
                  data={filteredCourseData}
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
