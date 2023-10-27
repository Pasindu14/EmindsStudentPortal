import React, { useEffect, useCallback, useRef } from "react";
import { useStudentStore } from "../../../zustand/stores/student-zustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { confirmToast } from "../../../components/Toast";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddStudentModal } from "./components/AddStudentModel";
import { UpdateStudentModel } from "./components/UpdateStudentModel";
import { SearchField } from "./components/Search";
import { formatDate } from "../../../helpers/commonHelpers";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";
import Card from "../../../components/Card";

export function Students() {
  const addStudentModalRef = useRef(null);
  const updateStudentModalRef = useRef(null);

  const showAddModal = () => {
    addStudentModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateStudentModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getStudents,
    addStudent,
    updateStudent,
    filter,
    filteredStudentData,
    setSelectedStudent,
    selectedStudent,
    removeStudent,
  } = useStudentStore();

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const handleAddButtonClick = (row) => {
    showUpdateModal();
    setSelectedStudent(row);
  };

  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeStudent(row.auto_id));
  };

  const studentColumns = [
    {
      name: "Name ",
      cell: (row) => row.name,
    },
    {
      name: "Phone Number",
      cell: (row) => row.phoneNumber,
    },
    {
      name: "Address",
      cell: (row) => row.address,
    },
    {
      name: "NIC",
      cell: (row) => row.nic,
    },
    {
      name: "Email",
      cell: (row) => row.email,
    },
    {
      name: "Birth Day",
      cell: function (row) {
        return formatDate(row.birthDay);
      },
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
            <button
              className="btn btn-error btn-sm rounded-none text-white ml-2 font-inter"
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
          <Card title="MANAGE STUDENTS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new student
              </button>

              <AddStudentModal
                addStudent={addStudent}
                loading={loading}
                addStudentModalRef={addStudentModalRef}
              />
              <UpdateStudentModel
                updateStudent={updateStudent}
                loading={loading}
                selectedStudent={selectedStudent}
                updateStudentModalRef={updateStudentModalRef}
              />

              <SearchField handleFilter={handleFilter} />

              <div className="table-border">
                <DataTable
                  columns={studentColumns}
                  data={filteredStudentData}
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
