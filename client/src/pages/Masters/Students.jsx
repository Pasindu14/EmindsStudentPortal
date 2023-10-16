import React, { useEffect, useCallback, useRef } from "react";
import { useStudentStore } from "../../zustand/stores/masterZustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../core/constants/styles";
import CustomInput from "../../components/CustomInput";
import { addStudentSchema } from "../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import { errorToast } from "../../components/Toast";
import { useHandleErrors } from "../../hooks/useHandleErrors";

import { AddStudentModal } from "./components/AddStudentModel";
import { UpdateStudentModel } from "./components/UpdateStudentModel";

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
    setSelectedStudent(row);
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
        return new Date(row.birthDay).toLocaleDateString("en-CA");
      },
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-success btn-sm rounded-none text-white font-inter"
              onClick={() => handleAddButtonClick(row)}
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

        <div className="flex justify-end mb-4">
          <input
            type="search"
            placeholder="Search"
            className="input input-bordered w-full input-primary max-w-xs rounded-none h-10"
            onChange={handleFilter}
          />
        </div>

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
    </>
  );
}
